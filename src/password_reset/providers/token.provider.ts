import { Connection } from 'typeorm';
import { Token } from '../entities/tokens.entity';

export const tokensProvider = [
  {
    provide: 'TOKEN_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Token),
    inject: ['DATABASE_CONNECTION'],
  },
];
