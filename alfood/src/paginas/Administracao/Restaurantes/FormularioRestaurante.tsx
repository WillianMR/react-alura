import { AppBar, Button, Link, Paper, TextField, Toolbar, Typography } from "@mui/material";
import { Box, Container, width } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";

const FormularioRestaurante = () => {
    const parametros = useParams();
    useEffect(() => {
        if(parametros.id){
            http.get<IRestaurante>(`v2/restaurantes/${parametros.id}/`)
                .then(resposta => setNomeRestaurante(resposta.data.nome))
        }
    }, [parametros])
    const [nomeRestaurante, setNomeRestaurante] = useState('');

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        if (parametros.id) {
            http.put(`v2/restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert("Restaurante atualizado com sucesso!")
                })
            
        }else{

            http.post('v2/restaurantes/', {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert("Restaurante cadastrado com sucesso!")
                })
        }

    }

    return (

        <Box>
            <Container maxWidth="lg" sx={{mt:1}}>
                <Paper sx={{ p:2 }}>
                    <Box sx={{diplay:'flex', flexDirection:'column', alignItems:'center', flexGrow:1}}> 
                        <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
                        <Box component="form" onSubmit={aoSubmeterForm}>
                            <TextField value={nomeRestaurante} 
                                onChange={evento => setNomeRestaurante(evento.target.value)} 
                                label="Nome do Restaurante"
                                variant="standard" 
                                fullWidth 
                                required />
                            <Button sx={{mt:1}} type="submit" fullWidth variant="outlined">Salvar</Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>

    )
}

export default FormularioRestaurante;