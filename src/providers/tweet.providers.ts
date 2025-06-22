import { Tweet } from '../entities/tweet.entity';
import { DataSource } from 'typeorm';

export const tweetProviders = [
  {
    provide: 'TWEET_REPOSITORY',
    useFactory: async (dataSource: DataSource) =>
      dataSource.getRepository(Tweet),
    inject: ['DATA_SOURCE'],
  },
];
