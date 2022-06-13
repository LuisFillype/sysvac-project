import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { usersProvider } from 'src/users/providers/user.providers';
import { vacinaProvider } from './providers/vacinas.providers';
import { VacinasController } from './vacinas.controller';
import { VacinasService } from './vacinas.service';

@Module({
  imports: [DatabaseModule],
  controllers: [VacinasController],
  providers: [...vacinaProvider, ...usersProvider, VacinasService],
})
export class VacinasModule {}
