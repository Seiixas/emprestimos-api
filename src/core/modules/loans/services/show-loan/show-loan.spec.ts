import { SIMULATION_NOT_FOUND_ERROR } from '../../errors/simulation-not-found';
import { ShowLoanService } from './show-loan.service';
import { LoansRepository } from '!domain/loans/loan.repository';
import { InMemoryLoansRepository } from '!infra/persistence/in-memory/repositories/in-memory-loans.repository';
import { LoanEntity } from '!domain/loans/loan.entity';

let showLoanSimulationService: ShowLoanService;
let loansRepository: LoansRepository;

describe('ShowLoanService', () => {
  beforeEach(() => {
    loansRepository = new InMemoryLoansRepository();
    showLoanSimulationService = new ShowLoanService(loansRepository);
  });

  it('should be able to show a loan', async () => {
    await loansRepository.save(
      new LoanEntity({
        id: '123',
        interestRate: 0.01,
        bills: [],
        uf: 'MG',
        installments: 15000,
        totalInterest: 0,
        totalAmount: 60000,
        requestedValue: 60000,
        cpf: '11111111111',
        installmentsAmount: 15000,
        birthday: new Date('1990-01-01'),
      }),
    );

    const simulation = await showLoanSimulationService.execute({ id: '123' });

    expect(simulation).toBeDefined();
  });

  it('should not be able to show a loan that does not exists', () => {
    expect(async () => {
      await showLoanSimulationService.execute({
        id: crypto.randomUUID(),
      });
    }).rejects.toBe(SIMULATION_NOT_FOUND_ERROR);
  });
});
