import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";

const AdministracaoRestaurantes = () => {
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

    useEffect(() => {
        http.get<IRestaurante[]>('v2/restaurantes/')
            .then(resposta => setRestaurantes(resposta.data))
    }, [])

    const excluir = (restauranteExcluido: IRestaurante) => {
        http.delete(`v2/restaurantes/${restauranteExcluido.id}/`)
            .then(() => {
                const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteExcluido.id)
                setRestaurantes([...listaRestaurante])
            })
    }

    return (
        <TableContainer component={Paper}>
             <Table>
                 <TableHead>
                     <TableRow>
                         <TableCell>
                             Nome
                         </TableCell>
                         <TableCell>
                             Editar
                         </TableCell>
                         <TableCell>
                             Excluir
                         </TableCell>
                     </TableRow>
                 </TableHead>
                 <TableBody>
                     {restaurantes.map(restaurante => (
                        <TableRow key={restaurante.id}>
                            <TableCell>
                                {restaurante.nome}
                            </TableCell>
                            <TableCell>
                                [ <Link to={`/admin/restaurantes/${restaurante.id}`}>editar</Link> ]
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" color="error" onClick={() => excluir(restaurante)}>excluir</Button>
                            </TableCell>
                        </TableRow>
                     ))}
                 </TableBody>
             </Table>
        </TableContainer>
    )
}

export default AdministracaoRestaurantes;