import { Reply } from '../entities/reply.entity';
import { DataSource } from 'typeorm';

export const replyProviders = [
  {
    provide: 'REPLY_REPOSITORY',
    useFactory: async (dataSource: DataSource) =>
      dataSource.getRepository(Reply),
    inject: ['DATA_SOURCE'],
  },
];
