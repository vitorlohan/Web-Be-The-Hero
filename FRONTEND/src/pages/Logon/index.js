import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';    /*Importa o componente LINK, Serve para Mudar de página sem precisar carregar toda pagina. */
import { FiLogIn } from 'react-icons/fi';    /*Utiliza-se como componente */

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';    /*logoImg: nome como referencia do endereço da imagem */

import heroesImg from '../../assets/heroes.png';

export default function Logon(){   

    const [id, setId] = useState('');
    const history = useHistory();   /*ENVIAR PARA ROTA PROFILE */

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });

            localStorage.setItem('ongId', id);  /*SALVAR NO STORE DO NAVEGADOR */
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');   /*ENVIAR PARA ROTA PROFILE */
        } catch (err){
            alert(`Falha no login, tente novamente.`);
        }
    }

    return(
       <div className="logo-container">
       <section className="form">
        <img src={logoImg} alt="Be The Hero" />
       
       <form onSubmit={handleLogin}>   
            <h1>Faça seu Login</h1>

            <input 
                placeholder="Sua ID" 
                value ={id}
                onChange={e => setId(e.target.value)}
            />
            <button className="button" type="submit">Entrar</button>

            <Link className="back-link"to="/register">
                <FiLogIn size={16} color="#E02041" /> 
                Não tenho cadastro
            </Link>
       </form>
       </section> 

       <img src={heroesImg} alt="Heroes"/> 
       </div>
    );
}