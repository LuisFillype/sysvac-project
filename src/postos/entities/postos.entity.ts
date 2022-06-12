import {
  BaseEntity,
  Column,
  Entity,
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
}
