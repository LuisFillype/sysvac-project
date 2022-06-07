import {
  ClassSerializerInterceptor,
  Controller,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VacinasService } from './vacinas.service';

@ApiTags('Vacinas Routes')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('vacinas')
export class VacinasController {
  constructor(private vacinasService: VacinasService) {}
}
