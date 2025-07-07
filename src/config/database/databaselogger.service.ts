import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseLoggerService implements OnApplicationBootstrap {
  constructor(private dataSource: DataSource) {}
  async onApplicationBootstrap() {
    if (this.dataSource.isInitialized) {
      Logger.log('Database connected', 'TypeORM');
    } else {
      Logger.log('Database not connected', 'TypeORM');
    }
  }
}
