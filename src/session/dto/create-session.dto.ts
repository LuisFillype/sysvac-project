import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSessionDTO {
  /**
   * @example admin@email.com
   */
  @IsString()
  @IsNotEmpty()
  email: string;
  /**
   * @example 12345
   */
  @IsString()
  @IsNotEmpty()
  password: string;
}
