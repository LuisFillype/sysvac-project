import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ResetPasswordDTO {
  /**
   * @example 123456
   */
  @IsString()
  @IsNotEmpty()
  new_password: string;

  /**
   * @example 123456
   */
  @IsString()
  @IsNotEmpty()
  new_password_confirmation: string;
  /**
   * @example 64cb4225-5fbe-47e1-93ce-615639e8be70
   */
  @IsUUID()
  token: string;
}
