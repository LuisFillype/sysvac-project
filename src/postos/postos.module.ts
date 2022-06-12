import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { usersProvider } from 'src/users/providers/user.providers';
import { PostosController } from './postos.controller';
import { PostosService } from './postos.service';
import { postoProvider } from './providers/posto.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PostosController],
  providers: [...postoProvider, ...usersProvider, PostosService],
})
export class PostosModule {}
