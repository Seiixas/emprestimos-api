import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { dataSource } from '!infra/persistence/typeorm/connection';

@Injectable()
export class TypeOrmService implements OnModuleInit {
  private readonly logger = new Logger(TypeOrmService.name);

  onModuleInit() {
    dataSource
      .initialize()
      .then(() => {
        this.logger.log(
          'Connection with ' + dataSource.options.type + ' database started',
        );
      })
      .catch(() => {
        this.logger.error(
          'Connection with ' + dataSource.options.type + ' database error',
        );
      });
  }
}
