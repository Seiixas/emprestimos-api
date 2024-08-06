import { Module } from '@nestjs/common';
import { LoansModule } from './loans/controllers/loans.module';
import { CacheModule } from './cache/cache.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoansModule,
    CacheModule,
    DatabaseModule,
  ],
})
export class AppModule {}
