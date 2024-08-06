import { LoanModel } from '!domain/loans/loan.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'bills' })
export class BillsModel {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'outstanding_balance', type: 'numeric' })
  outstandingBalance: number;

  @Column({ name: 'interest', type: 'numeric' })
  interest: number;

  @Column({ name: 'outstanding_balance_adjusted', type: 'numeric' })
  outstandingBalanceAdjusted: number;

  @Column({ name: 'installment_amount', type: 'numeric' })
  installmentAmount: number;

  @Column({ name: 'due' })
  due: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @ManyToOne(() => LoanModel, (loan) => loan.bills, { cascade: true })
  loan?: LoanModel;
}
