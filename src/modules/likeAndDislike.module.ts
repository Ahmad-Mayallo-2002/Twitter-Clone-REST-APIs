import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from './data.module';
import { likeProviders } from '../providers/like.providers';
import { LikeAndDislikeService } from '../services/likeAndDislike.service';
import { LikeAndDislikeController } from '../controllers/likeAndDislike.controller';
import { dislikeProviders } from '../providers/dislike.providers';
import { AuthMiddleware } from '../middlewares/auth.middleware';

@Module({
  imports: [DatabaseModule],
  providers: [...likeProviders, ...dislikeProviders, LikeAndDislikeService],
  controllers: [LikeAndDislikeController],
})
export class LikeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('/add-dislike/:tweetId', '/get-tweet-likes/:tweetId');
  }
}
