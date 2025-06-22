import { Body, Controller, Param, Req, Res } from '@nestjs/common';
import { ReplyService } from '../services/reply.service';
import { Response } from 'express';

@Controller('api')
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  async getTweetReply(
    @Res() res: Response,
    @Param() params: { tweetId: number },
  ) {
    return this.replyService.getTweetReply(res, params.tweetId);
  }

  async getSinglReply(
    @Res() res: Response,
    @Param() params: { replyId: number },
  ) {
    return this.replyService.getSingleReply(res, params.replyId);
  }

  async deleteReply(
    @Res() res: Response,
    @Req() req: Request,
    @Param() params: { tweetId: number },
  ) {
    return this.replyService.deleteReply(req, res, params.tweetId);
  }

  async updateReply(
    @Res() res: Response,
    @Req() req: Request,
    @Param() params: { tweetId: number },
    @Body() body: any,
  ) {
    return this.replyService.updateById(req, res, body, params.tweetId);
  }

  async create(
    @Res() res: Response,
    @Req() req: Request,
    @Param() params: { tweetId: number },
    @Body() body: any,
  ) {
    return this.replyService.createReply(req, res, body, params.tweetId);
  }
}
