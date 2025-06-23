import { Module } from '@nestjs/common';
import { FollowController } from '../controllers/follow.controller';
import { followProviders } from '../providers/follow.providers';
import { FollowService } from '../services/follow.service';
import { DatabaseModule } from './data.module';

@Module({
  imports: [DatabaseModule],
  providers: [...followProviders, FollowService],
  controllers: [FollowController],
})
export class FollowModule {}
