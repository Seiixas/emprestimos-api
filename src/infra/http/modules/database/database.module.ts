import { Module } from '@nestjs/common';
import { LoansRepository } from '!domain/loans/loan.repository';
import { TypeOrmService } from './typeorm.service';
import { TypeORMLoansRepository } from '!infra/persistence/typeorm/repositories/typeorm-loans.repository';
import { dataSource } from '!infra/persistence/typeorm/connection';
import { ConfigModule } from '@nestjs/config';
import { BillsRepository } from '!domain/bills/bill.repository';
import { TypeORMBillsRepository } from '!infra/persistence/typeorm/repositories/typeorm-bills.repository';
import { BillsModel } from '!domain/bills/bill.entity';
import { LoanModel } from '!domain/loans/loan.entity';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [
    TypeOrmService,
    {
      provide: LoansRepository,
      useFactory: () => {
        return new TypeORMLoansRepository(dataSource.getRepository(LoanModel));
      },
      inject: [TypeOrmService],
    },
    {
      provide: BillsRepository,
      useFactory: () => {
        return new TypeORMBillsRepository(dataSource.getRepository(BillsModel));
      },
      inject: [TypeOrmService],
    },
  ],
  exports: [LoansRepository, BillsRepository],
})
export class DatabaseModule {}
