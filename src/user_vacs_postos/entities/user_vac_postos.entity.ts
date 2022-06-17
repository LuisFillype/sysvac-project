import { Posto } from 'src/postos/entities/postos.entity';
import { User } from 'src/users/entities/users.entity';
import { Vacina } from 'src/vacinas/entities/vacina.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user_vac_postos' })
export class UserVacPostos {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  numero_dose_vacina: number;

  @Column()
  data_vacina: Date;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'id_servidor_publico' })
  id_servidor_publico: string;

  @ManyToOne(() => Posto, (posto) => posto.id)
  @JoinColumn({ name: 'id_posto' })
  posto: Posto;

  @ManyToOne(() => Vacina, (vacina) => vacina.id)
  @JoinColumn({ name: 'id_vacina' })
  vacina: Vacina;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'id_user' })
  id_user: string;

  @CreateDateColumn({
    default: () => 'NOW()',
  })
  created_at: Date;

  @UpdateDateColumn({
    default: () => 'NOW()',
    onUpdate: 'NOW()',
  })
  updated_at: Date;
}
