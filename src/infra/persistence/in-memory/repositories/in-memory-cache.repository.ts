import { CacheRepository } from '../../cache/cache.repository';

export class InMemoryCacheRepository implements CacheRepository {
  private _cache: any;
  constructor() {
    this._cache = {};
  }

  async get(key: string): Promise<any> {
    return this._cache[key] ? JSON.parse(this._cache[key]) : null;
  }

  async set(key: string, value: any): Promise<void> {
    this._cache[key] = JSON.stringify(value);
  }
}
