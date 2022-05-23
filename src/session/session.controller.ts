import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSessionDTO } from './dto/create-session.dto';
import { SessionService } from './session.service';

@ApiTags('Session route')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  create(@Body() createSessionDTO: CreateSessionDTO) {
    return this.sessionService.findLogin(createSessionDTO);
  }
}
