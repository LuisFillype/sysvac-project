import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Password routes')
@Controller('password')
export class PasswordResetController {}
