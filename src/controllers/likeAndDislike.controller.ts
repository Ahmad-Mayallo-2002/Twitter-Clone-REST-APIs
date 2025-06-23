import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { LikeAndDislikeService } from '../services/likeAndDislike.service';
import { AuthGuard } from '../auth.guard';

@Controller('api')
export class LikeAndDislikeController {
  constructor(private readonly likesAndDislikeService: LikeAndDislikeService) {}

  @UseGuards(AuthGuard)
  @Post('/add-like/:tweetId')
  async addLike(@Req() req: Request, @Param() params: { tweetId: number }) {
    return this.likesAndDislikeService.addLike(req, params.tweetId);
  }

  @UseGuards(AuthGuard)
  @Post('/add-dislike/:tweetId')
  async addDislike(@Req() req: Request, @Param() params: { tweetId: number }) {
    return this.likesAndDislikeService.addDislike(req, params.tweetId);
  }

  @Get('/get-tweet-likes/:tweetId')
  async getTweetLikesCount(@Param() params: { tweetId: number }) {
    return this.likesAndDislikeService.getTweetLikesCount(params.tweetId);
  }

  @Get('/get-tweet-dislikes/:tweetId')
  async getTweetDislikesCount(@Param() params: { tweetId: number }) {
    return this.likesAndDislikeService.getTweetDislikesCount(params.tweetId);
  }
}
