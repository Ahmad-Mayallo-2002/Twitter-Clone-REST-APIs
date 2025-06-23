import { Module } from '@nestjs/common';
import { DatabaseModule } from './data.module';
import { replyProviders } from '../providers/reply.providers';
import { ReplyService } from '../services/reply.service';
import { ReplyController } from '../controllers/reply.controller';
import { userProviers } from '../providers/user.providers';
import { tweetProviders } from '../providers/tweet.providers';
import { CloudinaryService } from '../cloudinary.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...replyProviders,
    ReplyService,
    ...userProviers,
    ...tweetProviders,
    CloudinaryService,
  ],
  controllers: [ReplyController],
})
export class ReplyModule {}
