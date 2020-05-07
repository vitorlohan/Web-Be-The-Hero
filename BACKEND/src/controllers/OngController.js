const crypto = require('crypto');
const connection = require('../database/connection');   /* Conecta/Conexão com o banco de dados */

module.exports = {      /* Importa os objetos dos métodos */
    
     /* LISTAGEM */
    async index(request, response) {     /*async é assíncrona*/
            const ongs = await connection('ongs').select('*');  /* Aguardar o código finalizar,conectar na tabela 'ongs' selecionar todos os campo da tabela*/
        
            return response.json(ongs); /* Retorna uma array direto */
        },

    /* CADASTRO */
    async create(request, response) { 
        const { name, email, whatsapp, city, uf } = request.body;   /* Variavel separada */
        
        const id = crypto.randomBytes(4).toString('HEX');   /* Gerar aleatorio 4 caracteres e converter em String em hexadecimal */	
    /*await é aguardar um código finalizar */
    await connection('ongs').insert ({    /* Conectar com banco de dados "ongs" e inserir dados*/ 
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
    
        return response.json({ id }); /*Retorna á id após cadastrar para se conectar dentro da nossa aplicação */
        
    }
};