import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';

@ApiTags('User Routes')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiBearerAuth()
  @Post()
  create(@Req() request: any, @Body() createUserDTO: CreateUserDTO) {
    console.log(createUserDTO);

    return this.userService.create(createUserDTO);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return;
  }
}
