import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSessionDTO {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
