import { Follow } from '../entities/follow.entity';
import { DataSource } from 'typeorm';

export const followProviders = [
  {
    provide: 'FOLLOW_REPOSITORY',
    useFactory: async (dataSource: DataSource) =>
      dataSource.getRepository(Follow),
    inject: ['DATA_SOURCE'],
  },
];
