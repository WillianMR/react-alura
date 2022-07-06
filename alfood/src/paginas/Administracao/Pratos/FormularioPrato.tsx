import { AppBar, Button, FormControl, InputLabel, Link, MenuItem, Paper, Select, TextField, Toolbar, Typography } from "@mui/material";
import { Box, Container, width } from "@mui/system";
import { type } from "os";
import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { setEmitFlags } from "typescript";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";
import IRestaurante from "../../../interfaces/IRestaurante";
import ITag from "../../../interfaces/ITag";

const FormularioPrato = () => {
    const parametros = useParams();
    // useEffect(() => {
    //     if(parametros.id){
    //         http.get<IRestaurante>(`v2/pratos/${parametros.id}/`)
    //             .then(resposta => setNomeRestaurante(resposta.data.nome))
    //     }
    // }, [parametros])

    const [nomePrato, setNomePrato] = useState('');
    const [descricao, setDescricao] = useState('');
    const [tag, setTag] = useState('');
    const [restaurante, setRestaurante] = useState('');
    const [imagem, setImagem] = useState<File | null | string>(null);
    const [tags, setTags] = useState<ITag[]>([]);
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

    const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
        if(evento.target.files?.length){
            setImagem(evento.target.files[0])
        } else {
            setImagem(null)
        }
    }

    useEffect(() => {
        if(parametros.id){
            http.get<{tags: ITag[] }>('v2/tags/')
                .then(resposta => setTags(resposta.data.tags))

            http.get<IRestaurante[]>('v2/restaurantes/')
                .then(resposta => setRestaurantes(resposta.data))

            http.get<IPrato>(`v2/pratos/${parametros.id}/`)
                .then(resposta => {
                    setNomePrato(resposta.data.nome)
                    setDescricao(resposta.data.descricao)
                    setTag(resposta.data.tag)
                    setRestaurante(String(resposta.data.restaurante))
                    setImagem(resposta.data.imagem)
                    })
        } else {
            http.get<{tags: ITag[] }>('v2/tags/')
                .then(resposta => setTags(resposta.data.tags))
            http.get<IRestaurante[]>('v2/restaurantes/')
                .then(resposta => setRestaurantes(resposta.data))
        }
    },[parametros])

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        const formData = new FormData();
        formData.append('nome',nomePrato)
        formData.append('descricao',descricao)
        formData.append('tag',tag)
        formData.append('restaurante',restaurante)
        if(imagem){

            if(typeof imagem !== 'string'){
                formData.append('imagem',imagem)
            }
        }
        if (parametros.id) {
            http.request({
                url:`v2/pratos/${parametros.id}/`,
                method:'PUT',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: formData
            })
                .then(() => {
                    setDescricao('');
                    setNomePrato('');
                    setTag('');
                    setRestaurante('');
                    setImagem(null);
                    alert('Prato atualizado com sucesso!')})
                .catch(erro => console.log(erro))
        } else {
            http.request({
                url:'v2/pratos/',
                method:'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: formData
            })
                .then(() => {
                    setDescricao('');
                    setNomePrato('');
                    setTag('');
                    setRestaurante('');
                    alert('Prato cadastrado com sucesso!')})
                .catch(erro => console.log(erro))
        }

    }

    return (

        <Box>
            <Container maxWidth="lg" sx={{mt:1}}>
                <Paper sx={{ p:2 }}>
                    <Box sx={{diplay:'flex', flexDirection:'column', alignItems:'center', flexGrow:1}}> 
                        <Typography component="h1" variant="h6">Formulário de Pratos</Typography>
                        <Box component="form" onSubmit={aoSubmeterForm}>
                            <TextField value={nomePrato} 
                                onChange={evento => setNomePrato(evento.target.value)} 
                                label="Nome do Prato"
                                variant="standard" 
                                fullWidth 
                                margin="dense"
                                required />
                            <TextField value={descricao} 
                                onChange={evento => setDescricao(evento.target.value)} 
                                label="Descrição"
                                variant="standard" 
                                fullWidth 
                                margin="dense"
                                required />
                            <FormControl margin="dense" fullWidth >
                                <InputLabel id="select-tag">Tag</InputLabel>
                                <Select labelId="select-tag" value={tag} onChange={evento => setTag(evento.target.value)}> 
                                    {tags.map(tag => <MenuItem value={tag.value} key={tag.id}>{tag.value}</MenuItem>
                                        )}
                                </Select>
                            </FormControl>
                            <FormControl margin="dense" fullWidth >
                                <InputLabel id="select-tag">Restaurante</InputLabel>
                                <Select labelId="select-tag" value={restaurante} onChange={evento => setRestaurante(evento.target.value)}> 
                                    {restaurantes.map(restaurante => <MenuItem value={restaurante.id} key={restaurante.id}>{restaurante.nome}</MenuItem>
                                        )}
                                </Select>
                            </FormControl>
                            {imagem? <TextField value={imagem} margin="dense" fullWidth disabled /> : ''}

                            <input type="file" onChange={selecionarArquivo}></input>

                            <Button sx={{mt:1}} type="submit" fullWidth variant="outlined">Salvar</Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>

    )
}

export default FormularioPrato;