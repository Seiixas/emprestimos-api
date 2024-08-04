import { Module } from '@nestjs/common';
import { LoansModule } from './loans/controllers/loans.module';

@Module({
  imports: [LoansModule],
})
export class AppModule {}
