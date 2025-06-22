import {
  Delete,
  Get,
  Inject,
  Injectable,
  NotFoundException,
  Post,
  Put,
} from '@nestjs/common';
import { Reply } from '../entities/reply.entity';
import { Repository } from 'typeorm';
import { Response } from 'express';

@Injectable()
export class ReplyService {
  constructor(
    @Inject('REPLY_REPOSITORY')
    private readonly replyService: Repository<Reply>,
  ) {}

  @Get('/get-tweet-replies/:tweetId')
  async getTweetReply(res: Response, tweetId: number) {
    const replies = await this.replyService.find({
      where: { tweet: { id: tweetId } },
    });
    if (!replies.length)
      throw new NotFoundException('No Replies on This Tweet');
    return replies;
  }

  @Get('/get-single-tweet/:replyId')
  async getSingleReply(res: Response, replyId: number) {
    const reply = await this.replyService.findOneBy({ id: replyId });
    if (!reply) throw new NotFoundException('Not Found Reply!');
    reply;
  }

  @Delete('/delete-reply/:tweetId')
  async deleteReply(req: Request, res: Response, tweetId: number) {
    const reply = await this.replyService.findOneBy({
      id: tweetId,
      user: { id: req.headers['id'] },
    });
    if (!reply) throw new NotFoundException('Not Found Reply!');
    await this.replyService.delete({
      id: tweetId,
      user: { id: req.headers['id'] },
    });
    return { msg: 'Reply is Deleted!' };
  }

  @Put('/update-reply/:tweetId')
  async updateById(req: Request, res: Response, body: any, tweetId: number) {
    const reply = await this.replyService.findOneBy({
      id: tweetId,
      user: { id: req.headers['id'] },
    });
    if (!reply) throw new NotFoundException('Not Found Reply!');
    await this.replyService.update(
      { id: tweetId, user: { id: req.headers['id'] } },
      body,
    );
    return { msg: 'Reply is Updated!' };
  }

  @Post('/create-reply/:tweetId')
  async createReply(req: Request, res: Response, body: any, tweetId: number) {
    const reply = this.replyService.create({
      user: { id: req.headers['id'] },
      id: tweetId,
      ...body,
    });
    await this.replyService.save(reply);
    return { msg: 'Reply is Added' };
  }
}
