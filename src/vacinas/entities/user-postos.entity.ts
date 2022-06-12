import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vacina } from './vacina.entity';

@Entity()
export class UserPostos extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  numero_dose: number;

  @ManyToMany(() => Vacina, (vacina) => vacina.user_postos)
  @JoinTable()
  postos: Posto[];
}
