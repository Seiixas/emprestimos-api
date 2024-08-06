import { BillsModel } from '!domain/bills/bill.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'loans' })
export class LoanModel {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'requested_value', type: 'numeric' })
  requestedValue: number;

  @Column({ name: 'interest_rate', type: 'numeric' })
  interestRate: number;

  @Column({ name: 'installments', type: 'numeric' })
  installments: number;

  @Column({ name: 'installment_amount' })
  installmentAmount: number;

  @Column({ name: 'total_interest', type: 'numeric' })
  totalInterest: number;

  @Column({ name: 'total_amount', type: 'numeric' })
  totalAmount: number;

  @Column({ name: 'cpf' })
  cpf: string;

  @Column({ name: 'uf' })
  uf: 'MG' | 'SP' | 'RJ' | 'ES';

  @Column({ name: 'birthday' })
  birthday: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date | null;

  @OneToMany(() => BillsModel, (bills) => bills.loan)
  bills: BillsModel[];
}
