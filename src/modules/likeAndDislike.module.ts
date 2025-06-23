import { Module } from '@nestjs/common';
import { DatabaseModule } from './data.module';
import { likeProviders } from '../providers/like.providers';
import { LikeAndDislikeService } from '../services/likeAndDislike.service';
import { LikeAndDislikeController } from '../controllers/likeAndDislike.controller';
import { dislikeProviders } from '../providers/dislike.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...likeProviders, ...dislikeProviders, LikeAndDislikeService],
  controllers: [LikeAndDislikeController],
})
export class LikeModule {}
