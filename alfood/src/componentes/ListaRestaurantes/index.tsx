import React, { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import { IPaginacao } from '../../interfaces/IPaginacao';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import http from '../../http';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Axios, AxiosRequestConfig } from 'axios';
import { height, width } from '@mui/system';

interface IParametrosBusca {
  ordering?: string
  search?: string
}

const ListaRestaurantes = () => {

  const [restaurantes,setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState('');
  const [busca, setBusca] = useState('');
  const [ordenacao, setOrdenacao] = useState('');
  const [paginaAnterior, setPaginaAnterior] = useState('');


  

  // useEffect(() => {
  //   http.get<IPaginacao<IRestaurante>>('/v1/restaurantes/')
  //     .then(resposta => {
  //       const restaurantesFiltrados = resposta.data.results.filter(item => testaBusca(item.nome));
  //       setRestaurantes(restaurantesFiltrados)
  //       setProximaPagina(resposta.data.next)
  //     })
  //     .catch(erro => {
  //       console.log(erro)
  //     })
    
  //   // console.log(restaurantesFiltrados)
  //   // setRestaurantes(restaurantesFiltrados);
  // }, [busca])
  

  // const verMais = () => {
  //   http.get<IPaginacao<IRestaurante>>(proximaPagina)
  //     .then(resposta => {
  //       const novosRestaurantes = [...restaurantes, ...resposta.data.results]
  //       const restaurantesFiltrados = novosRestaurantes.filter(item => testaBusca(item.nome));
  //       setRestaurantes(restaurantesFiltrados)
  //       setProximaPagina(resposta.data.next)
  //     })
  //     .catch(erro => {
  //       console.log(erro)
  //     })
  // }
  

  const carregarDados = (url:string, opcoes: AxiosRequestConfig = {}) => {
    http.get<IPaginacao<IRestaurante>>(url,opcoes)
      .then(resposta => {
        setRestaurantes(resposta.data.results);
        setProximaPagina(resposta.data.next);
        setPaginaAnterior(resposta.data.previous);
      })
      .catch(erro => {
        console.log(erro)
      })
  }

  const buscar = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const opcoes = {
      params: {

      } as IParametrosBusca
    }
    if(busca){
      opcoes.params.search = busca;
    }
    if(ordenacao){
      opcoes.params.ordering = ordenacao;
    }

    carregarDados('/v1/restaurantes/', opcoes);
    
  }

  useEffect(() => {
    carregarDados('/v1/restaurantes/');
    // const restaurantesFiltrados = restaurantes.filter(item => testaBusca(item.nome));
    // setRestaurantes(restaurantesFiltrados)
  }, []);

  return (<section className={style.ListaRestaurantes}>

      <form onSubmit={buscar}>
        <div  style={{width:'210px'}}>

          <TextField value={busca} 
                      onChange={evento => setBusca(evento.target.value)} 
                      label="Nome do Restaurante"
                      variant="filled" 
                      fullWidth
            />
        </div>
        <div style={{width:'210px'}}>
          <FormControl margin="dense" fullWidth >
              <InputLabel id="select-tag">Ordenação</InputLabel>
              <Select labelId="select-ordenacao" value={ordenacao} onChange={evento => setOrdenacao(evento.target.value)}> 
                   <MenuItem value="">Padrão</MenuItem>
                   <MenuItem value='id'>Por ID</MenuItem>
                   <MenuItem value='nome'>Por Nome</MenuItem>
              </Select>
          </FormControl>
        </div>
        <div  style={{width:'210px'}}>
          <Button sx={{mt:1, height:'100%'}} type="submit" variant="outlined" fullWidth>Buscar</Button>
        </div>
        {/* <input type="text" value={busca} placeholder="Nome do Restaurante" onChange={evento => setBusca(evento.target.value)} />  
        <button type='submit'>Buscar</button> */}
      </form>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {/* {proximaPagina && <button onClick={verMais}>
      ver mais
      </button>} */}
      {<button onClick={() => carregarDados(paginaAnterior)} disabled={!paginaAnterior}>Página Anterior</button>}
      {<button onClick={() => carregarDados(proximaPagina)} disabled={!proximaPagina}>Próxima Página</button>}
  </section>)
}

export default ListaRestaurantes