import { Module } from '@nestjs/common';
import { LoansController } from './loans.controller';
import { RequestLoanSimulationService } from 'src/core/modules/loans/services/request-loan-simulation/request-loan-simulation.service';

@Module({
  controllers: [LoansController],
  providers: [
    {
      provide: RequestLoanSimulationService,
      useFactory: () => new RequestLoanSimulationService(),
    },
  ],
})
export class LoansModule {}
