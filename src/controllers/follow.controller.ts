import { Controller, Delete, Get, Param, Post, Req, Res } from '@nestjs/common';
import { FollowService } from '../services/follow.service';
import { Response } from 'express';

@Controller('api')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Get('/get-user-followers/:followingId')
  async getFollowers(
    res: Response,
    @Param('followingId') params: { followingId: number },
  ) {
    return this.followService.getFollowers(res, params.followingId);
  }

  @Get('/get-user-followings')
  async getFollowings(@Req() req: Request, res: Response) {
    return this.followService.getFollowings(req, res);
  }

  @Post('/add-following')
  async addFollowing(
    @Req() req: Request,
    @Res() res: Response,
    params: { followingId: number },
  ) {
    return this.followService.addFollowing(req, res, params.followingId);
  }

  @Delete('/remove-following/:followingId')
  async cancelFollowing(
    @Req() req: Request,
    @Res() res: Response,
    params: { followingId: number },
  ) {
    return this.followService.removeFollowing(req, res, params.followingId);
  }
}
