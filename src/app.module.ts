import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SessionModule } from './session/session.module';
import { UsersModule } from './users/users.module';
import { VacinasModule } from './vacinas/vacinas.module';

@Module({
  imports: [UsersModule, SessionModule, VacinasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
