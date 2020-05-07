const express = require('express'); /*Importa pacote express */
const cors = require('cors'); /* Módulo de seguraça, ele vai determina quem vai poder acessar nossa aplicação. */
const routes = require('./routes'); /*Importa as rotas do arquivo 'routes.js'*/

const app = express();

app.use(cors());    /*Se for colocar em produção vai poder colocar endereço quem vai poder acessar aplicação*/
app.use(express.json()); /*Informando para verificar o corpo da requisção e converter o JSON em um
objeto do javascript, transforma em algo intendivel para aplicação. */

app.use(routes); /*Web voltar á funcionar com as rotas */

app.listen(3333);