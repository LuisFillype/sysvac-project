/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path');
require('dotenv').config();

const config = [
  {
    name: 'default',
    type: 'postgres',
    host: 'localhost',
    port: Number(process.env.POSTGRES_PORT),
    username: `${process.env.POSTGRES_USER}`,
    password: `${process.env.POSTGRES_PASSWORD}`,
    database: `${process.env.POSTGRES_DB_NAME}_${process.env.NODE_ENV}`,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
    migrations: ['dist/**/migrations/*{.ts,.js}'],
    cli: {
      migrationsDir: 'src/database/migrations',
    },
  },
  {
    name: 'seed',
    type: 'postgres',
    host: 'localhost',
    port: Number(process.env.POSTGRES_PORT),
    username: `${process.env.POSTGRES_USER}`,
    password: `${process.env.POSTGRES_PASSWORD}`,
    database: `${process.env.POSTGRES_DB_NAME}_${process.env.NODE_ENV}`,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
    migrations: ['dist/**/seeds/*{.ts,.js}'],
    cli: {
      migrationsDir: 'src/database/seeds',
    },
  },
  {
    name: 'testing',
    type: 'postgres',
    host: 'localhost',
    port: Number(process.env.POSTGRES_PORT),
    username: `${process.env.POSTGRES_USER}`,
    password: `${process.env.POSTGRES_PASSWORD}`,
    database: `${process.env.POSTGRES_DB_NAME}_testing`,
    entities: [resolve(__dirname, 'src/**/*.entity{.ts,.js}')],
    synchronize: true,
    migrations: ['src/**/migrations/*{.ts,.js}'],
    cli: {
      migrationsDir: 'src/database/migrations',
    },
  },
];

module.exports = config;
