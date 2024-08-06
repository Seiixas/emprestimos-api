import { InMemoryCacheRepository } from '!infra/persistence/in-memory/repositories/in-memory-cache.repository';
import { INSUFFICIENT_INSTALLMENT_VALUE_ERROR } from '../../errors/insufficient-installment-value';
import { MINIMUM_LOAN_NOT_REACHED_ERROR } from '../../errors/minimum-installment-not-reached';
import { RequestLoanSimulationService } from './request-loan-simulation.service';
import { CacheService } from '!shared/services/cache.service';
import { CacheRepository } from '!infra/persistence/cache/cache.repository';
import { UNDERAGE_NOT_ALLOWED } from '!modules/loans/errors/underage-not-allowed';
import { DATE_NOT_VALID } from '!modules/loans/errors/date-not-valid';

let requestLoanSimulationService: RequestLoanSimulationService;
let inMemoryCacheRepository: CacheRepository;
let cacheService: CacheService;

describe('RequestLoanSimulationService', () => {
  beforeEach(() => {
    inMemoryCacheRepository = new InMemoryCacheRepository();
    cacheService = new CacheService(inMemoryCacheRepository);
    requestLoanSimulationService = new RequestLoanSimulationService(
      cacheService,
    );
  });

  it('should be able to simulate a loan request', async () => {
    const simulation = await requestLoanSimulationService.execute({
      uf: 'MG',
      loan: 60000,
      installments: 15000,
      cpf: '11111111111',
      birthday: new Date('1990-01-01'),
    });

    expect(simulation.interestRate).toBe(0.01);
    expect(simulation.bills).toHaveLength(5);
  });

  it('should not be able to simulate a loan request with an amount below the minimum allowed', () => {
    expect(async () => {
      await requestLoanSimulationService.execute({
        uf: 'MG',
        loan: 15000,
        installments: 15000,
        cpf: '11111111111',
        birthday: new Date('1990-01-01'),
      });
    }).rejects.toBe(MINIMUM_LOAN_NOT_REACHED_ERROR);
  });

  it('should not be able to simulate a loan request with an installment below the minimum allowed', () => {
    expect(async () => {
      await requestLoanSimulationService.execute({
        uf: 'MG',
        loan: 60000,
        installments: 500,
        cpf: '11111111111',
        birthday: new Date('1990-01-01'),
      });
    }).rejects.toBe(INSUFFICIENT_INSTALLMENT_VALUE_ERROR);
  });

  it('should not be able to simulate a loan being an underage', () => {
    expect(async () => {
      await requestLoanSimulationService.execute({
        uf: 'MG',
        loan: 60000,
        installments: 6000,
        cpf: '11111111111',
        birthday: new Date(),
      });
    }).rejects.toBe(UNDERAGE_NOT_ALLOWED);
  });

  it('should not be able to simulate a loan with invalid date', () => {
    expect(async () => {
      await requestLoanSimulationService.execute({
        uf: 'MG',
        loan: 60000,
        installments: 6000,
        cpf: '11111111111',
        birthday: new Date('2025-01-01'),
      });
    }).rejects.toBe(DATE_NOT_VALID);
  });
});
