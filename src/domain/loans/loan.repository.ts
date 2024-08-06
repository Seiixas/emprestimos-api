import { LoanModel } from './loan.entity';

export abstract class LoansRepository {
  abstract save(loan: LoanModel): Promise<void>;
  abstract findById(id: string): Promise<LoanModel | null>;
  abstract findAll(): Promise<LoanModel[]>;
}
