/* SESSÃO DE LOGIN - LOGANDO  */

const connection = require('../database/connection');

module.exports = {

    async create(request, response) {
        const { id } = request.body;    /* Verificar se ONG existe */

        const ong = await connection('ongs')
        .where('id', id)
        .select('name')
        .first();

        if(!ong){   /* SE A ONG NÃO EXISTIR */
            return response.status(400).json({error: 'ID ONG NÃO REGISTRADA'})
        }

        return response.json(ong);
    }
};