import filtros from './filtros.json'

export default function Filtros() {
    function selecionarFiltro(opcao){

    }
    return (
        <div>
            {filtros.map((opcao) => (
                <button key={opcao.id} onClick={() => selecionarFiltro(opcao)}>
                    {opcao.label}
                </button>
            ))}
        </div>
    )
}