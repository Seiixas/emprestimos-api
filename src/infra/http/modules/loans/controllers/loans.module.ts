import { Module } from '@nestjs/common';
import { LoansController } from './loans.controller';
import { ShowLoanSimulationService } from '!modules/loans/services/show-loan-simulation/show-loan-simulation.service';
import { RequestLoanSimulationService } from '!modules/loans/services/request-loan-simulation/request-loan-simulation.service';
import { CacheService } from '!shared/services/cache.service';
import { CacheModule } from '../../cache/cache.module';
import { MakeLoanService } from '!modules/loans/services/make-loan/make-loan.service';
import { LoansRepository } from '!domain/loans/loan.repository';
import { DatabaseModule } from '../../database/database.module';
import { ShowLoanService } from '!modules/loans/services/show-loan/show-loan.service';

@Module({
  controllers: [LoansController],
  providers: [
    {
      provide: RequestLoanSimulationService,
      useFactory: (cacheService: CacheService) =>
        new RequestLoanSimulationService(cacheService),
      inject: [CacheService],
    },
    {
      provide: ShowLoanSimulationService,
      useFactory: (cacheService: CacheService) =>
        new ShowLoanSimulationService(cacheService),
      inject: [CacheService],
    },
    {
      provide: MakeLoanService,
      useFactory: (
        cacheService: CacheService,
        loansRepository: LoansRepository,
      ) => new MakeLoanService(cacheService, loansRepository),
      inject: [CacheService, LoansRepository],
    },
    {
      provide: ShowLoanService,
      useFactory: (loansRepository: LoansRepository) =>
        new ShowLoanService(loansRepository),
      inject: [LoansRepository],
    },
  ],
  imports: [CacheModule, DatabaseModule],
})
export class LoansModule {}
