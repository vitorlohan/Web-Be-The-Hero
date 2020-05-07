/*Perfil de uma Entidade */
const connection = require('../database/connection');   /* Conecta/Conexão com o banco de dados */

module.exports = {
    /*LISTAR PERFIL*/
    async index(request, response) {
        const ong_id = request.headers.authorization;   /*ong_id autorizadda */

        const incidents = await connection('incidents')/*Buscar todos os incidentes atráves quem foi á ong_id que criou. */
        .where('ong_id', ong_id)    /*ong_id que criou */
        .select('*'); /* Buscar todos os campos */

        return response.json(incidents);
    }
}