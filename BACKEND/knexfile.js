// Update with your config settings.

module.exports = {
  /*Desenvolvimento */
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite'
    },
    /* Vai criar diretorio aonde será armazenados */
    migrations:{
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,
  },
/*produção para o time de desenvolvimento ambiente que simula a produção para que o time possa testar online. */
  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  /*Produção, quanado o projeto é jogado online. */
  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
