import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateSessionDTO } from './dto/create-session.dto';
import { SessionService } from './session.service';

@ApiTags('Session routes')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @ApiCreatedResponse({
    schema: {
      allOf: [
        {
          properties: {
            user: {
              example: {
                id: 'string',
                name: 'string',
                email: 'string',
                phone: 'string',
                whatsapp: 'string',
                city: 'string',
                status: true,
                function: 'admin',
                created_at: '2022-03-07T15:10:48.454Z',
                updated_at: '2022-03-07T15:10:48.454Z',
              },
            },
            token: {
              example: 'string',
            },
          },
        },
      ],
    },
  })
  @Post()
  create(@Body() createSessionDTO: CreateSessionDTO) {
    return this.sessionService.findLogin(createSessionDTO);
  }
}
