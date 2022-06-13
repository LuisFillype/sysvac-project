import { Exclude } from 'class-transformer';
import { Token } from 'src/password_reset/entities/tokens.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

export enum UserFunction {
  ADMIN = 'admin',
  USER = 'user',
}
@Entity({ name: 'users' })
@Unique(['email', 'phone'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

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

  @Column({
    type: 'enum',
    enum: Object.values(UserFunction),
    default: UserFunction.USER,
  })
  function: UserFunction;

  @OneToMany(() => Token, (tokens) => tokens.user)
  tokens: Token[];
}
