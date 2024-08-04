import { LoanEntity } from '../loans/loan.entity';

interface IBillsProps {
  id?: string;
  outstandingBalance: number;
  interest: number;
  outstandingBalanceAdjusted: number;
  installmentAmount: number;
  due: Date;
  loan: LoanEntity;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

class BillEntity {
  private _id: string;
  private _outstandingBalance: number;
  private _interest: number;
  private _outstandingBalanceAdjusted: number;
  private _installmentAmount: number;
  private _due: Date;
  private _loan: LoanEntity;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _deletedAt: Date | null;

  constructor(props: IBillsProps) {
    this._id = props.id ?? crypto.randomUUID();
    this._outstandingBalance = props.outstandingBalance;
    this._interest = props.interest;
    this._outstandingBalanceAdjusted = props.outstandingBalanceAdjusted;
    this._installmentAmount = props.installmentAmount;
    this._due = props.due;
    this._createdAt = new Date();
    this._updatedAt = props.updatedAt ?? new Date();
    this._deletedAt = props.deletedAt ?? null;
  }

  set id(id: string) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  get outstandingBalance() {
    return this._outstandingBalance;
  }

  set outstandingBalance(outstandingBalance: number) {
    this._outstandingBalance = outstandingBalance;
    this._updatedAt = new Date();
  }

  get interest() {
    return this._interest;
  }

  set interest(interest: number) {
    this._interest = interest;
    this._updatedAt = new Date();
  }

  get outstandingBalanceAdjusted() {
    return this._outstandingBalanceAdjusted;
  }

  set outstandingBalanceAdjusted(outstandingBalanceAdjusted: number) {
    this._outstandingBalanceAdjusted = outstandingBalanceAdjusted;
    this._updatedAt = new Date();
  }

  get installmentAmount() {
    return this._installmentAmount;
  }

  set installmentAmount(installmentAmount: number) {
    this._installmentAmount = installmentAmount;
    this._updatedAt = new Date();
  }

  get due() {
    return this._due;
  }

  set due(due: Date) {
    this._due = due;
    this._updatedAt = new Date();
  }

  get loan() {
    return this._loan;
  }

  set loan(loan: LoanEntity) {
    this._loan = loan;
    this._updatedAt = new Date();
  }

  get createdAt() {
    return this._createdAt;
  }

  set createdAt(createdAt: Date) {
    this._createdAt = createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  set updatedAt(updatedAt: Date) {
    this._updatedAt = updatedAt;
  }

  get deletedAt() {
    return this._deletedAt;
  }

  set deletedAt(deletedAt: Date | null) {
    this._deletedAt = deletedAt;
    this._updatedAt = new Date();
  }
}

export { BillEntity, IBillsProps };
