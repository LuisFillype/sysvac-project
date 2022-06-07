import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { vacinaProvider } from './providers/vacinas.providers';
import { VacinasController } from './vacinas.controller';
import { VacinasService } from './vacinas.service';

@Module({
  imports: [DatabaseModule],
  controllers: [VacinasController],
  providers: [...vacinaProvider, VacinasService],
})
export class VacinasModule {}
