import { User } from 'src/users/entities/users.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vacina } from './vacina.entity';

@Entity({ name: 'users_vacs' })
export class UserVacsPostos extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  numero_dose: string;

  @ManyToMany(() => Vacina)
  @JoinTable()
  vacinas: Vacina[];

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];
}
