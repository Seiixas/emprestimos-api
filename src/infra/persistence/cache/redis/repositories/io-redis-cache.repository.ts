import { Logger } from '@nestjs/common';
import { Redis } from 'ioredis';

import { CacheRepository } from '../../cache.repository';

class IoRedisCacheRepository implements CacheRepository {
  private client: Redis;
  private readonly logger = new Logger(IoRedisCacheRepository.name);
  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_URL,
      port: 6379,
    });
  }

  async connect() {
    try {
      await this.client.connect();
      this.logger.log('IoRedis connection success');
    } catch (err) {
      this.logger.error('IoRedis connection error', err);
    }
  }

  async get(key: string): Promise<any> {
    const cachedValue = await this.client.get(key);
    return cachedValue ? JSON.parse(cachedValue) : null;
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    const stringValue = JSON.stringify(value);
    if (ttl) {
      await this.client.set(key, stringValue, 'EX', ttl);
    } else {
      await this.client.set(key, stringValue);
    }
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }
}

export { IoRedisCacheRepository };
