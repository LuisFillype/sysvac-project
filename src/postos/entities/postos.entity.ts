import { UserVacPostos } from 'src/user_vacs_postos/entities/user_vac_postos.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'postos' })
@Unique(['email', 'phone', 'cnpj'])
export class Posto extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  cnpj: string;

  @Column()
  phone: string;

  @Column()
  city: string;

  @Column()
  district: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  email: string;

  @OneToMany(() => UserVacPostos, (UserVacPostos) => UserVacPostos.id)
  user_vac_postos: UserVacPostos[];
}
