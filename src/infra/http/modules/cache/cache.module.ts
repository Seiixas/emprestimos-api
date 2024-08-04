import { Module } from '@nestjs/common';
import { CacheService } from '!shared/services/cache.service';
import { CacheRepository } from '!infra/persistence/cache/cache.repository';
import { IoRedisCacheRepository } from '!infra/persistence/cache/redis/repositories/io-redis-cache.repository';

@Module({
  imports: [IoRedisCacheRepository],
  providers: [
    {
      provide: CacheRepository,
      useClass: IoRedisCacheRepository,
    },
    {
      provide: CacheService,
      useFactory: (cacheRepository: CacheRepository) => {
        return new CacheService(cacheRepository);
      },
      inject: [CacheRepository],
    },
  ],
  exports: [CacheService],
})
export class CacheModule {}
