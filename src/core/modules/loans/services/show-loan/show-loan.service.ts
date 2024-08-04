import { LoanEntity } from '!domain/loans/loan.entity';
import { LoansRepository } from '!domain/loans/loan.repository';
import { SIMULATION_NOT_FOUND_ERROR } from '../../errors/simulation-not-found';

type Request = {
  id: string;
};

class ShowLoanService {
  constructor(private readonly loansRepository: LoansRepository) {}

  async execute({ id }: Request): Promise<LoanEntity> {
    const loan = await this.loansRepository.findById(id);

    if (!loan) {
      throw SIMULATION_NOT_FOUND_ERROR;
    }

    return loan;
  }
}

export { ShowLoanService };
