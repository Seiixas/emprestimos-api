import { LoanEntity } from '!domain/loans/loan.entity';
import { LoansRepository } from '!domain/loans/loan.repository';

class InMemoryLoansRepository implements LoansRepository {
  private loans: LoanEntity[] = [];

  async save(loan: LoanEntity): Promise<void> {
    this.loans.push(loan);
  }

  async findById(id: string): Promise<LoanEntity | null> {
    return this.loans.find((loan) => loan.id === id) || null;
  }

  async findAll(): Promise<LoanEntity[]> {
    return this.loans;
  }
}

export { InMemoryLoansRepository };
