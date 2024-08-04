import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BillsModel } from './installments.model';

@Entity()
export class LoanModel {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'requested_value' })
  requestedValue: number;

  @Column({ name: 'interest_rate' })
  interestRate: number;

  @Column({ name: 'installments' })
  installments: number;

  @Column({ name: 'installments_amount' })
  installmentsAmount: number;

  @Column({ name: 'total_interest' })
  totalInterest: number;

  @Column({ name: 'total_amount' })
  totalAmount: number;

  @Column({ name: 'cpf' })
  cpf: string;

  @Column({ name: 'uf' })
  uf: 'MG' | 'SP' | 'RJ' | 'ES';

  @Column({ name: 'birthday' })
  birthday: Date;

  @OneToMany(() => BillsModel, (bills) => bills.loan)
  bills: BillsModel[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date | null;
}
