import { Connection } from 'typeorm';
import { UserVacs } from '../entities/user-vacs.entity';
import { Vacina } from '../entities/vacina.entity';

export const vacinaProvider = [
  {
    provide: 'VACINA_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Vacina),
    inject: ['DATABASE_CONNECTION'],
  },
];

export const vacinaUserProvider = [
  {
    provide: 'USER_VACS_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(UserVacs),
    inject: ['DATABASE_CONNECTION'],
  },
];
