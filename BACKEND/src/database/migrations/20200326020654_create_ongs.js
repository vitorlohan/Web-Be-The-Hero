
exports.up = function(knex) {
  return knex.schema.createTable('ongs', function (table) {
      table.string('id').primary(); /* CHAVE PRIMARIA */
      table.string('name').notNullable(); /*notNullable - NÃO VAI PODER SER NULO/VAZIO */
      table.string('email').notNullable();
      table.string('whatsapp').notNullable();
      table.string('city').notNullable();
      table.string('uf', 2).notNullable(); /* Segundo parâmetro, com 2 caractere */
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};
