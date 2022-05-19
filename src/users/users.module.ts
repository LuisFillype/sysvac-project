import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { usersProvider } from './providers/user.providers';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [...usersProvider, UsersService],
})
export class UsersModule {}
