import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PasswordResetController } from './password_reset.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [PasswordResetController],
  providers: [],
})
export class PasswordResetModule {}
