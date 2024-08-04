import { Module } from '@nestjs/common';
import { LoansRepository } from '!domain/loans/loan.repository';
import { TypeOrmService } from './typeorm.service';
import { TypeORMLoansRepository } from '!infra/persistence/typeorm/repositories/typeorm-loans.repository';
import { dataSource } from '!infra/persistence/typeorm/connection';
import { LoanModel } from '!infra/persistence/typeorm/models/loan.model';

@Module({
  providers: [
    TypeOrmService,
    {
      provide: LoansRepository,
      useFactory: () => {
        return new TypeORMLoansRepository(dataSource.getRepository(LoanModel));
      },
      inject: [TypeOrmService],
    },
  ],
  exports: [LoansRepository],
})
export class DatabaseModule {}
