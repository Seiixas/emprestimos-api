import { LoanModel } from '!domain/loans/loan.entity';
import { LoansRepository } from '!domain/loans/loan.repository';

class InMemoryLoansRepository implements LoansRepository {
  private loans: LoanModel[] = [];

  async save(loan: LoanModel): Promise<void> {
    this.loans.push(loan);
  }

  async findById(id: string): Promise<LoanModel | null> {
    return this.loans.find((loan) => loan.id === id) || null;
  }

  async findAll(): Promise<LoanModel[]> {
    return this.loans;
  }
}

export { InMemoryLoansRepository };
