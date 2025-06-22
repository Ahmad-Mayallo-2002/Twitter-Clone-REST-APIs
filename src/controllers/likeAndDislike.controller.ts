import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { LikeAndDislikeService } from '../services/likeAndDislike.service';
import { Response } from 'express';

@Controller('api')
export class LikeAndDislikeController {
  constructor(private readonly likesAndDislikeService: LikeAndDislikeService) {}

  @Post('/add-like/:tweetId')
  async addLike(
    @Req() req: Request,
    @Res() res: Response,
    @Param() params: { tweetId: number },
  ) {
    return this.likesAndDislikeService.addLike(req, res, params.tweetId);
  }

  @Post('/add-dislike/:tweetId')
  async addDislike(
    @Req() req: Request,
    @Res() res: Response,
    @Param() params: { tweetId: number },
  ) {
    return this.likesAndDislikeService.addDislike(req, res, params.tweetId);
  }

  @Get('/get-tweet-likes/:tweetId')
  async getTweetLikesCount(
    @Res() res: Response,
    @Param() params: { tweetId: number },
  ) {
    return this.likesAndDislikeService.getTweetLikesCount(res, params.tweetId);
  }

  @Get('/get-tweet-dislikes/:tweetId')
  async getTweetDislikesCount(
    @Res() res: Response,
    @Param() params: { tweetId: number },
  ) {
    return this.likesAndDislikeService.getTweetLikesCount(res, params.tweetId);
  }
}
