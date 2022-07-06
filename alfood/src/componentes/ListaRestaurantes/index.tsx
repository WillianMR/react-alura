import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import { IPaginacao } from '../../interfaces/IPaginacao';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import http from '../../http';
import { TextField } from '@mui/material';

const ListaRestaurantes = () => {

  const [restaurantes,setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState('');
  const [busca, setBusca] = useState('');
  // const [paginaAnterior, setPaginaAnterior] = useState('');

  const testaBusca = (title:string) => {
    const regex = new RegExp(busca,'i');
    return regex.test(title);
  } 

  

  useEffect(() => {
    http.get<IPaginacao<IRestaurante>>('/v1/restaurantes/')
      .then(resposta => {
        const restaurantesFiltrados = resposta.data.results.filter(item => testaBusca(item.nome));
        setRestaurantes(restaurantesFiltrados)
        setProximaPagina(resposta.data.next)
      })
      .catch(erro => {
        console.log(erro)
      })
    
    // console.log(restaurantesFiltrados)
    // setRestaurantes(restaurantesFiltrados);
  }, [busca])
  

  const verMais = () => {
    http.get<IPaginacao<IRestaurante>>(proximaPagina)
      .then(resposta => {
        const novosRestaurantes = [...restaurantes, ...resposta.data.results]
        const restaurantesFiltrados = novosRestaurantes.filter(item => testaBusca(item.nome));
        setRestaurantes(restaurantesFiltrados)
        setProximaPagina(resposta.data.next)
      })
      .catch(erro => {
        console.log(erro)
      })
  }
  

  // const carregarDados = (url:string) => {
  //   http.get<IPaginacao<IRestaurante>>(url)
  //     .then(resposta => {
  //       setRestaurantes(resposta.data.results)
  //       setProximaPagina(resposta.data.next)
  //       setPaginaAnterior(resposta.data.previous)
  //     })
  //     .catch(erro => {
  //       console.log(erro)
  //     })
  // }
  // useEffect(() => {
  //   carregarDados('/v1/restaurantes/')
  //   const restaurantesFiltrados = restaurantes.filter(item => testaBusca(item.nome));
  //   setRestaurantes(restaurantesFiltrados)
  // }, [busca]);

  return (<section className={style.ListaRestaurantes}>

    <TextField value={busca} 
                onChange={evento => setBusca(evento.target.value)} 
                label="Nome do Restaurante"
                variant="filled" 
      />
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {proximaPagina && <button onClick={verMais}>
      ver mais
      </button>}
      {/* {<button onClick={() => carregarDados(paginaAnterior)} disabled={!paginaAnterior}>Página Anterior</button>}
      {<button onClick={() => carregarDados(proximaPagina)} disabled={!proximaPagina}>Próxima Página</button>} */}
  </section>)
}

export default ListaRestaurantes