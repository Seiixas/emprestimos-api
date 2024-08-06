import { CacheService } from '!shared/services/cache.service';
import { SIMULATION_NOT_FOUND_ERROR } from '../../errors/simulation-not-found';
import { LoansRepository } from '!domain/loans/loan.repository';
import { TRequestLoanSimulationResponse } from '../request-loan-simulation/request-loan-simulation.service';
import { LoanModel } from '!domain/loans/loan.entity';
import { BillsModel } from '!domain/bills/bill.entity';
import { BillsRepository } from '!domain/bills/bill.repository';
import { SIMULATION_ALREADY_MADE_ERROR } from '!modules/loans/errors/simulation-already-made';
import { parse } from 'date-fns';
import { DATABASE_ERROR } from '!shared/errors/database-error.error';

type Request = {
  simulationId: string;
};

class MakeLoanService {
  constructor(
    private readonly cacheService: CacheService,
    private readonly loansRepository: LoansRepository,
    private readonly billsRepository: BillsRepository,
  ) {}

  async execute({ simulationId }: Request): Promise<void> {
    const simulation: TRequestLoanSimulationResponse =
      await this.cacheService.getFromCache(simulationId);

    if (!simulation) {
      throw SIMULATION_NOT_FOUND_ERROR;
    }

    const simulationAlreadyMade = await this.loansRepository.findById(
      simulation.id,
    );

    if (simulationAlreadyMade) {
      throw SIMULATION_ALREADY_MADE_ERROR;
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

    const loan = new LoanModel();

    Object.assign(loan, {
      id,
      uf,
      installments,
      cpf,
      birthday: parse(String(birthday), 'dd/MM/yyyy', new Date()),
      installmentAmount: installmentsAmount,
      totalInterest,
      requestedValue,
      totalAmount,
      interestRate,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const billEntities = bills.map((bill) => {
      const billEntity = new BillsModel();
      Object.assign(billEntity, {
        id: bill.id,
        outstandingBalance: bill.outstandingBalance,
        interest: bill.interest,
        outstandingBalanceAdjusted: bill.outstandingBalanceAdjusted,
        installmentAmount: bill.installmentAmount,
        due: new Date(bill.due),
        createdAt: new Date(),
        updatedAt: new Date(),
        loan,
      });
      return billEntity;
    });

    try {
      await this.billsRepository.bulkSave(billEntities);
      await this.loansRepository.save(loan);
      await this.cacheService.deleteFromCache(simulationId);
    } catch (err) {
      throw DATABASE_ERROR;
    }
  }
}

export { MakeLoanService };
