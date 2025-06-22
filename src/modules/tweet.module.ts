import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from './data.module';
import { tweetProviders } from '../providers/tweet.providers';
import { TweetService } from '../services/tweet.service';
import { TweetController } from '../controllers/tweet.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

@Module({
  imports: [DatabaseModule],
  providers: [...tweetProviders, TweetService],
  controllers: [TweetController],
})
export class TweetModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('/delete-tweet/:id', '/update-tweet/:id', '/create-tweet');
  }
}
