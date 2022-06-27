import { ITarefa } from "../../types/tarefa";
import Item from "./item";
import style from './Lista.module.scss'

interface Props {
    tarefas: ITarefa[],
    selecionaTarefa: (tarefaSelecionada: ITarefa) => void
}


function  Lista ({tarefas, selecionaTarefa} : Props) {
    return (
        <aside className={style.listaTarefas}>
            <h2> Estudos do Dia</h2>
            <ul>
                {tarefas.map((item) => (
                    <Item 
                    selecionaTarefa={selecionaTarefa}
                    {...item} 
                    key={item.id} >
                    </Item>
                ))}
            </ul>
        </aside>
    )
}

export default Lista;