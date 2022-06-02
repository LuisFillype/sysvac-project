import { IsNotEmpty, IsString } from 'class-validator';

export class FindUserDTO {
  /**
   * @example 12345678901
   */
  @IsString()
  @IsNotEmpty()
  cpf: string;
}
