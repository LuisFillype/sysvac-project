import { Connection } from 'typeorm';
import { User } from '../entities/users.entity';

export const usersProvider = [
  {
    provide: 'USERS_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: ['DATABASE_CONNECTION'],
  },
];
