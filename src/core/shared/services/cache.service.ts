import { CacheRepository } from '!infra/persistence/cache/cache.repository';

export class CacheService {
  constructor(private cacheRepository: CacheRepository) {}

  async getFromCache(key: string): Promise<any | null> {
    return await this.cacheRepository.get(key);
  }

  async setInCache(key: string, value: any, ttl?: number): Promise<void> {
    return this.cacheRepository.set(key, value, ttl);
  }
}
