import { IsEnum, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { UserFunction } from '../entities/users.entity';

class EndressDTO {
  /**
   * @example cidade
   */
  @IsString()
  @IsNotEmpty()
  city: string;
  /**
   * @example bairro
   */
  @IsString()
  @IsNotEmpty()
  district: string;
  /**
   * @example numero
   */
  @IsString()
  @IsNotEmpty()
  number: string;
  /**
   * @example numero
   */
  @IsString()
  @IsNotEmpty()
  street: string;
}

export class CreateUserDTO {
  /**
   * @example novoUsuario
   */
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * @example email
   */
  @IsString()
  @IsNotEmpty()
  email: string;

  /**
   * @example cpf
   */
  @IsString()
  @IsNotEmpty()
  cpf: string;

  /**
   * @example senha
   */
  @IsString()
  @IsNotEmpty()
  password: string;

  /**
   * @example telefone
   */
  @IsString()
  @IsNotEmpty()
  phone: string;

  /**
   * @example funcao
   */
  @IsEnum(UserFunction)
  @IsNotEmpty()
  function: UserFunction;
  /**
   * @example EndressDTO
   */
  @IsObject()
  @IsNotEmpty()
  endress: EndressDTO;
}
