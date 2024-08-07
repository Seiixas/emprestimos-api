import { LoanModel } from '!domain/loans/loan.entity';
import { LoansRepository } from '!domain/loans/loan.repository';

class ListAllLoansService {
  constructor(private readonly loansRepository: LoansRepository) {}

  async execute(): Promise<LoanModel[]> {
    const loans = await this.loansRepository.findAll();

    return loans;
  }
}

export { ListAllLoansService };
