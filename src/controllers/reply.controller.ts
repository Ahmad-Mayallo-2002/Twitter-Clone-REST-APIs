import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ReplyService } from '../services/reply.service';

@Controller('api')
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @Get('/get-tweet-replies/:tweetId')
  async getTweetReply(@Param() params: { tweetId: number }) {
    return this.replyService.getTweetReply(params.tweetId);
  }

  @Get('/get-single-reply/:replyId')
  async getSinglReply(@Param() params: { replyId: number }) {
    return this.replyService.getSingleReply(params.replyId);
  }

  @Delete('/delete-reply/:tweetId')
  async deleteReply(@Req() req: Request, @Param() params: { tweetId: number }) {
    return this.replyService.deleteReply(req, params.tweetId);
  }

  @Put('/update-reply/:tweetId')
  async updateReply(
    @Req() req: Request,
    @Param() params: { tweetId: number },
    @Body() body: any,
  ) {
    return this.replyService.updateById(req, body, params.tweetId);
  }

  @Post('/create-reply/:tweetId')
  async create(
    @Req() req: Request,
    @Param() params: { tweetId: number },
    @Body() body: any,
  ) {
    return this.replyService.createReply(req, body, params.tweetId);
  }
}
