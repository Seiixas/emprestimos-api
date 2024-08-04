import { LoanEntity } from './loan.entity';

export abstract class LoansRepository {
  abstract save(loan: LoanEntity): Promise<void>;
  abstract findById(id: string): Promise<LoanEntity | null>;
  abstract findAll(): Promise<LoanEntity[]>;
}
