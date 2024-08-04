import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LoanModel } from './loan.model';

@Entity()
export class BillsModel {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'outstanding_balance' })
  outstandingBalance: number;

  @Column({ name: 'interest' })
  interest: number;

  @Column({ name: 'outstanding_balance_adjusted' })
  outstandingBalanceAdjusted: number;

  @Column({ name: 'installment_amount' })
  installmentAmount: number;

  @Column({ name: 'due' })
  due: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @ManyToOne(() => LoanModel, (loan) => loan.bills)
  loan: LoanModel;
}
