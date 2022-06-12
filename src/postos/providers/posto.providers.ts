import { Connection } from 'typeorm';
import { Posto } from '../entities/postos.entity';

export const postoProvider = [
  {
    provide: 'POSTOS_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Posto),
    inject: ['DATABASE_CONNECTION'],
  },
];
