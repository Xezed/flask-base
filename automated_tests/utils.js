const dbConfig = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'flask_base',
    password: process.env.DB_PASSWORD || '123456',
    database: process.env.DB_NAME || 'flask_base',
    port: process.env.DB_PORT || 5432,
  },
};

exports.knex = require('knex')(dbConfig);
