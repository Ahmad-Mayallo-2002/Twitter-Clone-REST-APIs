import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user.module';
import { TweetModule } from './modules/tweet.module';
import { LikeModule } from './modules/likeAndDislike.module';
import { ReplyModule } from './modules/reply.module';
import { FollowModule } from './modules/follow.module';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    UserModule,
    TweetModule,
    LikeModule,
    ReplyModule,
    FollowModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
