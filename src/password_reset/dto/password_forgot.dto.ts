import { IsEmail, IsNotEmpty } from 'class-validator';

export class PasswordForgotDTO {
  /**
   * @example user@email.com
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
