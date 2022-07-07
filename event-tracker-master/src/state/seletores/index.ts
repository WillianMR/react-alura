import { selector } from "recoil";
import { IEvento } from "../../interfaces/IEvento";
import { filtroDeEventos, listaDeEventosState } from "../atom";

export const eventosFiltradosState = selector({
    key: 'eventosFiltradosState',
    get: ({ get }) => {
        const filtro = get(filtroDeEventos);
        const todosOsEventos = get(listaDeEventosState);
        const eventos = todosOsEventos.filter(evento => {
            if(filtro.status === 'incompletos'){
                return evento.completo === false
            }
            if(filtro.status === 'completos'){
                return evento.completo === true
            }
            if(!filtro.data){
              return true;
            } else{
              const ehMesmoDia = filtro.data.toISOString().slice(0,10) === evento.inicio.toISOString().slice(0,10);
              return ehMesmoDia;
            }
          });

        return eventos;
    }
})

export const eventosAsync = selector({
  key: 'eventosAsync',
  get:async () => {
    const respostaHttp = await fetch('http://localhost:8080/eventos')
    const eventosJson: IEvento[] = await respostaHttp.json()
    return eventosJson.map(evento => ({
      ...evento,
      inicio: new Date(evento.inicio),
      fim: new Date(evento.fim),
    }))
  }
})
