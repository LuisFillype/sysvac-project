import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'postos' })
export class PostosEntity extends BaseEntity {
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
