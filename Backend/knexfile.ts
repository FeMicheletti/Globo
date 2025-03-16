import type { Knex } from "knex";

require('dotenv').config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: {
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME,
    },
    migrations: {
        directory: './src/migrations'
    }
  }
};

module.exports = config;