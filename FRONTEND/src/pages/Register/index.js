import React, { useState } from 'react'; /*ARMAZENAR OS INPUT DENTRO DO ESTADO */
import { Link, useHistory } from'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register(){

    const [name, setName] = useState(''); /*PRIMEIRO VALOR E SEGUNDO ATUALIZAR O VALOR */
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory(); /*SERVE PARA FAZER NAVEGAÇÃO ATRAVES DE UMA FUNÇÃO JS, QUANDO NÃO PODE COLCOAR O LINK*/

    async function handleRegister(e){
        /*FUNÇÃO RESPONSÁVEL POR FAZER CADASTRO DO USUARIO*/
        e.preventDefault(); /*PREVINIR O COMPORTAMENTO PADRÃO DO FORMULARIO */
    

        const data = {  /*Objeto js, enviar para API */
            name,
            email,
            whatsapp,
            city,
            uf,
        };
    
            try {
                const response = await api.post('ongs', data); /*ROTA DO BACKEND */ /*OBS: POR PADRÃO O AXIOS JÁ ENVIA EM FORMATO JSON. */
                alert(`Seu ID de acesso: ${response.data.id}`);
                history.push('/');  /*ENVIAR PARA ROTA RAIZ */
           
            } catch (err) {
                alert(`Erro no cadastro, tente novamente.`);
            }

    
    }
   
    return(
        <div className="register-container">         
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link"to="/">
                    <FiArrowLeft size={16} color="#E02041" /> 
                    Não tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}> 
                    <input 
                        placeholder="Nome da ONG" 
                        value={name} /*Valor do useState */
                        onChange={e => setName(e.target.value)} /*Função escrita no formato reduzido */
                        /*"onChange" Ouvir as mudança que acontece nesse input */
                        /*"e" Evento de mudança (parâmetro) */ /*setName(e.target.value) - Corpo da função */
                        /*(e.target.value): Representa o valor do input, dentro da variavel Name */
                    />
                    <input 
                        type="email" placeholder="E-mail" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        placeholder="WhatsApp" 
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />
                   
                   <div className="input-group">
                       <input 
                            placeholder="Cidade" 
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                       <input 
                        type="UF" placeholder="UF" style={{ width:80 }} 
                        value={uf}
                        onChange={e => setUf(e.target.value)}
                       />
                   </div>

                   <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );

}