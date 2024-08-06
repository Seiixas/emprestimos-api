import { CacheRepository } from '!infra/persistence/cache/cache.repository';
import { ShowLoanSimulationService } from './show-loan-simulation.service';
import { CacheService } from '!shared/services/cache.service';
import { InMemoryCacheRepository } from '!infra/persistence/in-memory/repositories/in-memory-cache.repository';
import { SIMULATION_NOT_FOUND_ERROR } from '../../errors/simulation-not-found';

let showLoanSimulationService: ShowLoanSimulationService;
let inMemoryCacheRepository: CacheRepository;
let cacheService: CacheService;

describe('RequestLoanSimulationService', () => {
  beforeEach(() => {
    inMemoryCacheRepository = new InMemoryCacheRepository();
    cacheService = new CacheService(inMemoryCacheRepository);
    showLoanSimulationService = new ShowLoanSimulationService(cacheService);
  });

  it('should be able to show a simulated a loan', async () => {
    await cacheService.setInCache('123', {
      id: '123',
      birthday: new Date('1990-01-01'),
    });

    const simulation = await showLoanSimulationService.execute({ id: '123' });

    expect(simulation).toBeDefined();
  });

  it('should not be able to show a simulated loan that does not exists', () => {
    expect(async () => {
      await showLoanSimulationService.execute({
        id: crypto.randomUUID(),
      });
    }).rejects.toBe(SIMULATION_NOT_FOUND_ERROR);
  });
});
