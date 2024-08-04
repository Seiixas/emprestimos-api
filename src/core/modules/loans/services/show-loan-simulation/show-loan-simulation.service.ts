import { CacheService } from '!shared/services/cache.service';
import { SIMULATION_NOT_FOUND_ERROR } from '../../errors/simulation-not-found';

type Request = {
  id: string;
};

class ShowLoanSimulationService {
  constructor(private readonly cacheService: CacheService) {}

  async execute({ id }: Request) {
    const simulation = await this.cacheService.getFromCache(id);

    if (!simulation) {
      throw SIMULATION_NOT_FOUND_ERROR;
    }

    return simulation;
  }
}

export { ShowLoanSimulationService };
