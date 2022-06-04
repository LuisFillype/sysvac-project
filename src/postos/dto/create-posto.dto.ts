import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { EndressDTO } from 'src/users/dto/create-user.dto';

export class CreatePostoDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  cnpj: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsObject()
  endress: EndressDTO;
}
