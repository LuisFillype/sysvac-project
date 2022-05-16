/* eslint-disable @typescript-eslint/no-var-requires */
import { createConnection } from 'typeorm';
require('dotenv').config();

function selectDatabase() {
  return process.env.TESTING === 'true' ? 'testing' : 'default';
}

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection(selectDatabase()),
    keepConnectionAlive: true,
  },
];
