import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { BCryptHashProvider } from 'src/providers/hashProdiver';
import { JWTProvider } from 'src/providers/jwtProvider';
import { usersProvider } from './providers/user.providers';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [...usersProvider, UsersService, BCryptHashProvider, JWTProvider],
})
export class UsersModule {}
