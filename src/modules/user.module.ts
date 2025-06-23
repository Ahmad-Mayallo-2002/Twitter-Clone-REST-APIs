import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from './data.module';
import { userProviers } from '../providers/user.providers';
import { UserController } from '../controllers/user.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { UserService } from '../services/user.service';
import { CloudinaryService } from '../cloudinary.service';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviers, UserService, CloudinaryService],
  controllers: [UserController],
})
export class UserModule {}
