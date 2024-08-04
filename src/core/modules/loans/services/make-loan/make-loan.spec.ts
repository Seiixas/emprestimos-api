import { CacheService } from '!shared/services/cache.service';
import { MakeLoanService } from './make-loan.service';
import { LoansRepository } from '!domain/loans/loan.repository';
import { InMemoryCacheRepository } from '!infra/persistence/in-memory/repositories/in-memory-cache.repository';
import { InMemoryLoansRepository } from '!infra/persistence/in-memory/repositories/in-memory-loans.repository';
import { CacheRepository } from '!infra/persistence/cache/cache.repository';
import { SIMULATION_NOT_FOUND_ERROR } from '../../errors/simulation-not-found';

let cacheService: CacheService;
let cacheRepository: CacheRepository;
let makeLoanService: MakeLoanService;
let loansRepository: LoansRepository;

describe('MakeLoanService', () => {
  beforeEach(() => {
    cacheRepository = new InMemoryCacheRepository();
    cacheService = new CacheService(cacheRepository);
    loansRepository = new InMemoryLoansRepository();
    makeLoanService = new MakeLoanService(cacheService, loansRepository);
  });

  it('should be able to make a loan', async () => {
    await cacheService.setInCache('123', {
      uf: 'MG',
      loan: 60000,
      installments: 15000,
      cpf: '11111111111',
      birthday: new Date('1990-01-01'),
      bills: [
        {
          outstandingBalance: 12000,
          interest: 0.01,
          outstandingBalanceAdjusted: 12120,
          installmentAmount: 2424,
          due: new Date('2022-01-01'),
        },
        {
          outstandingBalance: 12120,
          interest: 0.01,
          outstandingBalanceAdjusted: 12241.2,
          installmentAmount: 2448.24,
          due: new Date('2022-02-01'),
        },
        {
          outstandingBalance: 12241.2,
          interest: 0.01,
          outstandingBalanceAdjusted: 12363.612,
          installmentAmount: 2472.72,
          due: new Date('2022-03-01'),
        },
        {
          outstandingBalance: 12363.612,
          interest: 0.01,
          outstandingBalanceAdjusted: 12487.24812,
          installmentAmount: 2497.44,
          due: new Date('2022-04-01'),
        },
        {
          outstandingBalance: 12487.24812,
          interest: 0.01,
          outstandingBalanceAdjusted: 12612.121602,
          installmentAmount: 2522.42,
          due: new Date('2022-05-01'),
        },
      ],
    });

    await makeLoanService.execute({ simulationId: '123' });

    const loans = await loansRepository.findAll();

    expect(loans).toHaveLength(1);
  });

  it('should not be able to make a loan with a non-existent simulation', () => {
    expect(async () => {
      await makeLoanService.execute({ simulationId: 'non-existent-id' });
    }).rejects.toBe(SIMULATION_NOT_FOUND_ERROR);
  });
});
