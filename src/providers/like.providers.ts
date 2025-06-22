import { Like } from '../entities/like.entity';
import { DataSource } from 'typeorm';

export const likeProviders = [
  {
    provide: 'LIKE_REPOSITORY',
    useFactory: async (dataSource: DataSource) =>
      dataSource.getRepository(Like),
    inject: ['DATA_SOURCE'],
  },
];
