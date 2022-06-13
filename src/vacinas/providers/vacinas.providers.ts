import { Connection } from 'typeorm';
import { Vacina } from '../entities/vacina.entity';

export const vacinaProvider = [
  {
    provide: 'VACINA_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Vacina),
    inject: ['DATABASE_CONNECTION'],
  },
];
