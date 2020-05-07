const knex = require('knex');   /* Importa pacote knex */
const configuration = require('../../knexfile');    /* Importa as configurações do banco de dados */

const connection = knex(configuration.development) /* Conexão com o desenvolvimento */

module.exports = connection;    /* Exporta á conexão com o banco de dados */