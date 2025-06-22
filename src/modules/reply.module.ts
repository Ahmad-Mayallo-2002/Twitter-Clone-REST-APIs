import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from './data.module';
import { replyProviders } from '../providers/reply.providers';
import { ReplyService } from '../services/reply.service';
import { ReplyController } from '../controllers/reply.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { userProviers } from '../providers/user.providers';
import { tweetProviders } from '../providers/tweet.providers';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...replyProviders,
    ReplyService,
    ...userProviers,
    ...tweetProviders,
  ],
  controllers: [ReplyController],
})
export class ReplyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        '/delete-reply/:tweetId',
        '/update-reply/:tweetId',
        '/create-reply/:tweetId',
      );
  }
}
