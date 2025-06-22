import { Module } from '@nestjs/common';
import { databaseProviders } from '../providers/data.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
