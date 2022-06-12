import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VacinasService } from './vacinas.service';

@ApiTags('Vacinas Routes')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('vacinas')
export class VacinasController {
  constructor(private vacinasService: VacinasService) {}

  @Get()
  teste() {
    return this.vacinasService.test();
  }
}
