import { Dislike } from '../entities/dislikes.entity';
import { DataSource } from 'typeorm';

export const dislikeProviders = [
  {
    provide: 'DISLIKE_REPOSITORY',
    useFactory: async (dataSource: DataSource) =>
      dataSource.getRepository(Dislike),
    inject: ['DATA_SOURCE'],
  },
];
