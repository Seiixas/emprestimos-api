import { Module } from '@nestjs/common';
import { LoansModule } from './loans/controllers/loans.module';
import { CacheModule } from './cache/cache.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [LoansModule, CacheModule, DatabaseModule],
})
export class AppModule {}
