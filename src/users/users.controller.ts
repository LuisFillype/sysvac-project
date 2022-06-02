import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthMiddleware } from 'src/middleware/auth';
import { CreateUserDTO } from './dto/create-user.dto';
import { FindUserDTO } from './dto/find-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('User Routes')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiBearerAuth()
  @UseGuards(AuthMiddleware)
  @Post()
  create(@Req() request: any, @Body() createUserDTO: CreateUserDTO) {
    const userLogged = request.user.id;

    return this.userService.create(createUserDTO, userLogged);
  }

  @ApiBearerAuth()
  @Post(':id')
  @UseGuards(AuthMiddleware)
  findOne(@Req() request: any, @Body() findUserDTO: FindUserDTO) {
    const userLogged = request.user.id;
    return this.userService.findOne(userLogged, findUserDTO);
  }

  @ApiBearerAuth()
  @Get()
  @UseGuards(AuthMiddleware)
  findAll(@Req() request: any) {
    const userLogged = request.user.id;
    return this.userService.findAll(userLogged);
  }

  @ApiBearerAuth()
  @UseGuards(AuthMiddleware)
  @ApiParam({
    name: 'id',
    description: 'uuid',
    example: '84985d78-6510-4586-ae48-3c234026d1dd',
  })
  @ApiOkResponse({
    schema: {
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
  })
  @Patch(':id')
  update(
    @Req() request: any,
    @Param('id') id: string,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    const userLogged = request.user.id;
    return this.userService.update(userLogged, updateUserDTO, id);
  }
}
