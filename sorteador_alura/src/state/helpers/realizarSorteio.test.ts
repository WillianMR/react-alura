import { realizarSorteio } from "./realizarSorteio"

describe('dado um sorteio de amigo secreto', () => {

    test('cada participante não sorteie o próprio nome', () => {
        const participantes = [
            'Ana',
            'Clara',
            'Maria',
            'Pedro',
            'André',
            'José'
        ]

        const sorteio = realizarSorteio(participantes)
        participantes.forEach(participante => {
            const amigoSecreto = sorteio.get(participante)
            expect(amigoSecreto).not.toEqual(participante)
        })
    })
})