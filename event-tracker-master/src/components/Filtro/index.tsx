import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { IFiltroDeEventos } from '../../interfaces/IFiltroDeEventos';
import { filtroDeEventos } from '../../state/atom';
import style from './Filtro.module.scss';

const Filtro: React.FC = () => {
  
  const [data, setData] = useState('')
  const [estado, setEstado] = useState('ambos')
  const setFiltroDeEvento = useSetRecoilState<IFiltroDeEventos>(filtroDeEventos);
  
  const submeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    const filtro: IFiltroDeEventos = {status:'ambos'}
    filtro.status = estado;
    if (data) {
      filtro.data = new Date(data);
    } else {
      filtro.data = null;
    }

    setFiltroDeEvento(filtro);
  }

  return (<form className={style.Filtro} onSubmit={submeterForm}>
    <h3 className={style.titulo}>Filtrar por data</h3>
    <input 
      type="date" 
      name="data"
      className={style.input}
      onChange={evento => setData(evento.target.value)} 
      placeholder="Por data"
      value={data} />
    
      <select name='select-filtro' value={estado} onChange={evento => setEstado(evento.target.value)}>
          <option value='ambos'>Ambos</option>
          <option value='completos'>Completos</option>
          <option value='incompletos'>Incompletos</option>
      </select>


    <button className={style.botao}>
      Filtrar
    </button>

  </form>)
}

export default Filtro