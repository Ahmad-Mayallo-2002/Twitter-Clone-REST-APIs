import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from './data.module';
import { userProviers } from '../providers/user.providers';
import { UserController } from '../controllers/user.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { UserService } from '../services/user.service';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviers, UserService],
  controllers: [UserController],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('/delete-user/:id', '/update-user/:id');
  }
}
