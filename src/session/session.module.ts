import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { BCryptHashProvider } from 'src/providers/hashProdiver';
import { JWTProvider } from 'src/providers/jwtProvider';
import { usersProvider } from 'src/users/providers/user.providers';
import { SessionController } from './session.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [SessionController],
  providers: [...usersProvider, BCryptHashProvider, JWTProvider],
})
export class SessionModule {}
