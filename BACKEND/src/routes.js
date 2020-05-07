const express = require('express'); /* Importa pacote express */

//const connection = require('./database/connection');    /*Conectar com o banco de dados*/	

const OngController = require('./controllers/OngController');       /*Importa OngController.js (Controle) */
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


const routes = express.Router(); 

routes.post('/sessions', SessionController.create); /* SESSÃO DE LOGIN */

routes.get('/ongs', OngController.index);  /* LISTAGEM */
routes.post('/ongs', OngController.create); /* CADASTRO */

routes.get('/profile', ProfileController.index);    /* LISTAR CASOS ESPECIFICOS DE PERFIL */

routes.get('/incidents', IncidentController.index);   /* LISTAGEM CASOS */
routes.post('/incidents', IncidentController.create);   /* CRIAR CASOS */
routes.delete('/incidents/:id', IncidentController.delete); /* DELETAR CASO */

module.exports = routes; /*Exporta as Rotas disponiveis para index.js poder acessar */