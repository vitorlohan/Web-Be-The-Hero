import React, { useEffect, useState } from 'react'; /*FUNÇÃO useEffect SERVE PARA DISPARA ALGUMA FUNÇÃO EM UM DETERMINADO MOMENTO DO COMPONENTE, EXEMPLO: ASSIM QUE É MOSTRADO EM TELA */
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import './styles.css';

export default function Profile(){
    const [incidents, setIncidents] = useState([]);  /*GRAVAR AS INFORMAÇÕES DENTRO DELE* /*COMEÇAR COM ARRAY VAZIO*/
    
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');    /*Dentro de localStorage */
    
    useEffect(() => {   /*PRIMEIRA QUAL FUNÇÃO  QUE EU QUERO QUE SEJA EXECUTA, SEGUNDO QUANDO QUE SERÁ EXECUTADA*/
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {    /*THEN: PARA PEGAR OS DADOS*/
            setIncidents(response.data);
        }) 
    }, [ongId]); /*DEPENDENCIA*/ 

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });           
            /* ATUALIZAR AUTOMATICO SEM ATAUALIZAR Á PAGINA */
            setIncidents(incidents.filter(incident => incident.id !== id));  /*MANTER APENAS OS INCIDENTES EM QUE O ID FOR DIFERENTE DO ID DELETE */
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    function handleLogout() {
        localStorage.clear();   /*LIMPAR O LocalStorage */

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vindo, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                <FiPower size={18} color="#E02041" /> 
                </button>
            </header>

            <h1>Casos cadastrados</h1>
              <ul>
                  {incidents.map(incident => (

                        <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                        </li>   
                  ))}
              </ul>
        </div>
        /*{incidents.map(incident => ())} -> VAI PERCORRER CADA UM DELES RETORNANDO ALGUMA COISA*/
        /*key={incident.id} -> VAI AJUDAR O REACT QUAL ITEM É QUAL, SEPRE PRECISA COLOCAR O VALOR ÚNICO PARA IDENTIFICAR CADA UM DESSES INCIDENTES*/
    );
}