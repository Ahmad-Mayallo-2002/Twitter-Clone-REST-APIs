import { Module } from '@nestjs/common';
import { DatabaseModule } from './data.module';
import { tweetProviders } from '../providers/tweet.providers';
import { TweetService } from '../services/tweet.service';
import { TweetController } from '../controllers/tweet.controller';
import { CloudinaryService } from '../cloudinary.service';

@Module({
  imports: [DatabaseModule],
  providers: [...tweetProviders, TweetService, CloudinaryService],
  controllers: [TweetController],
})
export class TweetModule {}
