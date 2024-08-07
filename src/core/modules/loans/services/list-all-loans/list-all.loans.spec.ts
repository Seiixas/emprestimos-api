import { LoanModel } from '!domain/loans/loan.entity';
import { LoansRepository } from '!domain/loans/loan.repository';
import { InMemoryLoansRepository } from '!infra/persistence/in-memory/repositories/in-memory-loans.repository';
import { ListAllLoansService } from './list-all-loans.service';

let listAllLoansService: ListAllLoansService;
let loansRepository: LoansRepository;

describe('List All Loans', () => {
  beforeEach(() => {
    loansRepository = new InMemoryLoansRepository();
    listAllLoansService = new ListAllLoansService(loansRepository);
  });

  it('should be able to list all loans', async () => {
    const loan = new LoanModel();

    Object.assign(loan, {
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
    });

    await loansRepository.save(loan);

    const loans = await listAllLoansService.execute();

    expect(loans).toEqual([loan]);
    expect(loans).toHaveLength(1);
  });
});
