import { UserVacPostos } from 'src/user_vacs_postos/entities/user_vac_postos.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @OneToMany(() => UserVacPostos, (UserVacPostos) => UserVacPostos.id)
  user_vac_postos: UserVacPostos[];
}
