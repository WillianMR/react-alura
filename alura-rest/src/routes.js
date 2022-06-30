import Footer from 'components/Footer';
import Menu from 'components/Menu';
import PaginaPadrao from 'components/PaginaPadrao';
import Cardapio from 'pages/Cardapio';
import Inicio from 'pages/Inicio';
import Notfound from 'pages/NotFound';
import Prato from 'pages/Prato';
import Sobre from 'pages/Sobre';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';


export default function AppRouter(){
    return(
        <main className='container'>
            <Router>
                <Menu />
                <Routes>
                    <Route path='/' element={<PaginaPadrao />}>
                        <Route index element={<Inicio/>}/>
                        <Route path='cardapio' element={<Cardapio />}></Route>
                        <Route path='sobre' element={<Sobre />}></Route>
                        <Route path='prato/:id' element={<Prato />}></Route>
                    </Route>
                    <Route path='*' element={<Notfound />}></Route>
                </Routes>
                <Footer />
            </Router>
        </main>
    )
}