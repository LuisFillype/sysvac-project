import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserPostos } from './user-postos.entity';
import { UserVacs } from './user-vacs.entity';

@Entity({ name: 'vacinas' })
export class Vacina extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  doses: number;

  @Column()
  descricao: string;

  @Column()
  intervalo: string;

  @ManyToMany(() => UserVacs, (user_vacs) => user_vacs.vacinas)
  user_vacs: UserVacs[];

  @ManyToMany(() => UserPostos, (user_postos) => user_postos.vacinas)
  user_postos: UserPostos[];
}
