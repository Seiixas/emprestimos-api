import { BillEntity } from '../biils/bill.entity';

interface ILoanProps {
  id?: string;
  requestedValue: number;
  interestRate: number;
  installments: number;
  installmentsAmount: number;
  totalInterest: number;
  totalAmount: number;
  cpf: string;
  uf: 'MG' | 'SP' | 'RJ' | 'ES';
  birthday: Date;
  bills?: BillEntity[] | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

class LoanEntity {
  private _id: string;
  private _requestedValue: number;
  private _interestRate: number;
  private _installments: number;
  private _installmentsAmount: number;
  private _totalInterest: number;
  private _totalAmount: number;
  private _cpf: string;
  private _uf: 'MG' | 'SP' | 'RJ' | 'ES';
  private _birthday: Date;
  private _bills: BillEntity[] | null;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _deletedAt: Date | null;

  constructor(props: ILoanProps) {
    this._id = props.id ?? crypto.randomUUID();
    this._createdAt = new Date();
    this._updatedAt = props.updatedAt ?? new Date();
    this._deletedAt = props.deletedAt ?? null;
    this._requestedValue = props.requestedValue;
    this._interestRate = props.interestRate;
    this._installments = props.installments;
    this._installmentsAmount = props.installmentsAmount;
    this._totalInterest = props.totalInterest;
    this._totalAmount = props.totalAmount;
    this._cpf = props.cpf;
    this._uf = props.uf;
    this._birthday = props.birthday;
  }

  get id() {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
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

  get requestedValue() {
    return this._requestedValue;
  }

  get interestRate() {
    return this._interestRate;
  }

  get installments() {
    return this._installments;
  }

  get installmentsAmount() {
    return this._installmentsAmount;
  }

  get totalInterest() {
    return this._totalInterest;
  }

  get totalAmount() {
    return this._totalAmount;
  }

  get cpf() {
    return this._cpf;
  }

  get uf() {
    return this._uf;
  }

  get birthday() {
    return this._birthday;
  }

  get bills() {
    return this._bills;
  }

  set requestedValue(requestedValue: number) {
    this._requestedValue = requestedValue;
    this._updatedAt = new Date();
  }

  set interestRate(interestRate: number) {
    this._interestRate = interestRate;
    this._updatedAt = new Date();
  }

  set installments(installments: number) {
    this._installments = installments;
    this._updatedAt = new Date();
  }

  set installmentsAmount(installmentsAmount: number) {
    this._installmentsAmount = installmentsAmount;
    this._updatedAt = new Date();
  }

  set totalInterest(totalInterest: number) {
    this._totalInterest = totalInterest;
    this._updatedAt = new Date();
  }

  set totalAmount(totalAmount: number) {
    this._totalAmount = totalAmount;
    this._updatedAt = new Date();
  }

  set cpf(cpf: string) {
    this._cpf = cpf;
    this._updatedAt = new Date();
  }

  set uf(uf: 'MG' | 'SP' | 'RJ' | 'ES') {
    this._uf = uf;
    this._updatedAt = new Date();
  }

  set birthday(birthday: Date) {
    this._birthday = birthday;
    this._updatedAt = new Date();
  }

  set bills(bills: BillEntity[]) {
    this._bills = bills;
    this._updatedAt = new Date();
  }

  set deletedAt(deletedAt: Date | null) {
    this._deletedAt = deletedAt;
  }
}

export { LoanEntity, ILoanProps };
