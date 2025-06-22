import { Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { FollowService } from '../services/follow.service';

@Controller('api')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Get('/get-user-followers')
  async getFollowers() {
    return this.followService.getFollowers();
  }

  @Get('/get-user-followings')
  async getFollowings(@Req() req: Request) {
    return this.followService.getFollowings(req);
  }

  @Post('/add-following/:id')
  async addFollowing(@Req() req: Request, @Param() params: { id: number }) {
    return this.followService.addFollowing(req, params.id);
  }

  @Delete('/remove-following/:id')
  async cancelFollowing(@Req() req: Request, @Param() params: { id: number }) {
    return this.followService.removeFollowing(req, params.id);
  }
}
