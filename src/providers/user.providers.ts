import { User } from '../entities/user.entity';
import { DataSource } from 'typeorm';

export const userProviers = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: async (dataSource: DataSource) =>
      dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
