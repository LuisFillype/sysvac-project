import { IsEnum, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { UserFunction } from '../entities/users.entity';

class EndressDTO {
  /**
   * @example Santa rita do sapucai
   */
  @IsString()
  @IsNotEmpty()
  city: string;
  /**
   * @example Maristela
   */
  @IsString()
  @IsNotEmpty()
  district: string;
  /**
   * @example 999
   */
  @IsString()
  @IsNotEmpty()
  number: string;
  /**
   * @example Rua das Ruas
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
   * @example novousuario@email.com
   */
  @IsString()
  @IsNotEmpty()
  email: string;

  /**
   * @example 12345679901
   */
  @IsString()
  @IsNotEmpty()
  cpf: string;

  /**
   * @example 12345
   */
  @IsString()
  @IsNotEmpty()
  password: string;

  /**
   * @example 359988888888
   */
  @IsString()
  @IsNotEmpty()
  phone: string;

  /**
   * @example user
   */
  @IsEnum(UserFunction)
  @IsNotEmpty()
  function: UserFunction;

  @IsObject()
  @IsNotEmpty()
  endress: EndressDTO;
}
