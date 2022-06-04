import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthMiddleware } from 'src/middleware/auth';
import { CreatePostoDto } from './dto/create-posto.dto';
import { PostosService } from './postos.service';

@ApiTags('Postos Routes')
@Controller('postos')
export class PostosController {
  constructor(private readonly postosService: PostosService) {}

  @ApiBearerAuth()
  @UseGuards(AuthMiddleware)
  @Post()
  create(@Body() createPostoDto: CreatePostoDto, @Req() request: any) {
    const userLogged = request.user.id;

    return this.postosService.create(createPostoDto, userLogged);
  }
}
