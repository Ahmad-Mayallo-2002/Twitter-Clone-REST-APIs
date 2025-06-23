import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FollowService } from '../services/follow.service';
import { AuthGuard } from '../auth.guard';

@Controller('api')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @UseGuards(AuthGuard)
  @Get('/get-user-followers')
  async getFollowers() {
    return this.followService.getFollowers();
  }

  @UseGuards(AuthGuard)
  @Get('/get-user-followings')
  async getFollowings(@Req() req: Request) {
    return this.followService.getFollowings(req);
  }

  @UseGuards(AuthGuard)
  @Post('/add-following/:id')
  async addFollowing(@Req() req: Request, @Param() params: { id: number }) {
    return this.followService.addFollowing(req, params.id);
  }

  @UseGuards(AuthGuard)
  @Delete('/remove-following/:id')
  async cancelFollowing(@Req() req: Request, @Param() params: { id: number }) {
    return this.followService.removeFollowing(req, params.id);
  }
}
