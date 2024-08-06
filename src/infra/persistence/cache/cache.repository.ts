abstract class CacheRepository {
  abstract get(key: string): Promise<any | null>;
  abstract set(key: string, value: any, ttl?: number): Promise<void>;
  abstract delete(key: string): Promise<void>;
}

export { CacheRepository };
