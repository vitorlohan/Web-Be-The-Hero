
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table) {
        table.increments(); /* CHAVE PRIMARIA AUTO INCREMENTO*/
        
        table.string('title').notNullable(); /*notNullable - NÃO VAI PODER SER NULO/VAZIO */
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable();   /* Relacionamento */
        
        table.foreign('ong_id').references('id').inTable('ongs');   /* CHAVE ESTRANGEIRA */
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
