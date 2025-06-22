import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { FollowController } from '../controllers/follow.controller';
import { followProviders } from '../providers/follow.providers';
import { FollowService } from '../services/follow.service';
import { DatabaseModule } from './data.module';

@Module({
  imports: [DatabaseModule],
  providers: [...followProviders, FollowService],
  controllers: [FollowController],
})
export class FollowModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        '/get-followings',
        '/ger-followers',
        '/add-follow',
        '/cancel-follow',
      );
  }
}
