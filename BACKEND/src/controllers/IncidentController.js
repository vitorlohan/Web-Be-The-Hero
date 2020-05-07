/* APENAS 5 MÉTODOS */
const connection = require('../database/connection');   /* Conecta/Conexão com o banco de dados */

module.exports = {
    
    /* LISTAGEM */
    async index(request, response){
        const {page = 1} = request.query;   /* Páginação Buscar na query, padrão 1 */
        
        const [count] = await connection('incidents').count();  /* Qunatidade de casos */
        
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')   /* Relacionartabela ongs e chave ongs.id = chave incidents.ong_id */
            .limit(5)   /* Limitar 5 registro por página, 5 incidentes*/
            .offset((page - 1)*5)   /*Pular 5 em 5, 1-1=0 * 5 = 0,...*/
            .select([
                    'incidents.*',  /* Todos os dados do incidents, porém so quero os dados da ongs seguintes.*/
                    'ongs.name',
                    'ongs.email',
                    'ongs.whatsapp',
                    'ongs.city',
                    'ongs.uf'
            ]);

        response.header('X-TOTAL-Count', count['count(*)']);    /* Total de itens na lista no cabeçalho */

        return response.json (incidents);
    },
    
    /* CADASTRO */
    async create(request, response){
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization; /*Qual usuario está logado vem da requisição do cabeçalho, Guarda informações do contexto da requisição */
    
    const [id] = await connection('incidents').insert({ /*Primeira chave da array será armazenada na variavel id*/
        title,
        description,
        value,
        ong_id,
    });
        return response.json({ id }); /*Retorna nome da informação para que o front-end saiba que é um ID */
    },

    /* DELETE */
    async delete(request, response) {    /* Deletar realmente quem criou o caso */
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection ('incidents')
        .where('id', id)    /* Buscar o incidente onde o id foi igual ao id  */
        .select('ong_id')   /*Selecionar apenas a coluna ong_id */
        .first(); /* Retorna apenas um resultado */

        if (incident.ong_id !=  ong_id){
         /*https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status - Códigos de status de respostas HTTP */
            return response.status(401).json({ error: 'Operação não autorizada.'}); /*Status do http padrão é (200)*/ /*Código status (401) Quando usuario não tem altorização com formato de json*/
        }

        await connection('incidents').where('id', id).delete(); /*Deletar o registro da tabela banco de dados */

        return response.status(204).send(); /*Status(204) É uma resposta que deu sucesso porém não tem conteúdo no front-end para retorna.*/
        /*send() - enviar resposta sem corpo nem um, vazia.*/
    }
};