abstract class CacheRepository {
  abstract get(key: string): Promise<any | null>;
  abstract set(key: string, value: any, ttl?: number): Promise<void>;
}

export { CacheRepository };
