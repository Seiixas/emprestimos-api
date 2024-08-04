import { LoanEntity } from '!domain/loans/loan.entity';
import { CacheService } from '!shared/services/cache.service';
import { SIMULATION_NOT_FOUND_ERROR } from '../../errors/simulation-not-found';
import { LoansRepository } from '!domain/loans/loan.repository';
import { TRequestLoanSimulationResponse } from '../request-loan-simulation/request-loan-simulation.service';
import { BillEntity } from '!domain/biils/bill.entity';

type Request = {
  simulationId: string;
};

class MakeLoanService {
  constructor(
    private readonly cacheService: CacheService,
    private readonly loansRepository: LoansRepository,
  ) {}

  async execute({ simulationId }: Request): Promise<void> {
    const simulation: TRequestLoanSimulationResponse =
      await this.cacheService.getFromCache(simulationId);

    if (!simulation) {
      throw SIMULATION_NOT_FOUND_ERROR;
    }

    const {
      uf,
      installments,
      cpf,
      birthday,
      bills,
      installmentsAmount,
      totalInterest,
      requestedValue,
      totalAmount,
      id,
      interestRate,
    } = simulation;

    const loan = new LoanEntity({
      installmentsAmount,
      totalInterest,
      requestedValue,
      totalAmount,
      id,
      interestRate,
      uf,
      installments,
      cpf,
      birthday,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const billsInEntity = bills.map(
      (bill) =>
        new BillEntity({
          ...bill,
          loan: loan,
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
    );

    loan.bills = billsInEntity;

    await this.loansRepository.save(loan);
  }
}

export { MakeLoanService };
