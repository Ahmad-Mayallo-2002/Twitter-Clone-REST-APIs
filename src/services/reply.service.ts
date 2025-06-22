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
import { Tweet, User } from 'src/types';

@Injectable()
export class ReplyService {
  constructor(
    @Inject('REPLY_REPOSITORY')
    private readonly replyRepository: Repository<Reply>,
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
    @Inject('TWEET_REPOSITORY')
    private readonly tweetRepository: Repository<Tweet>,
  ) {}

  async getTweetReply(tweetId: number) {
    const replies = await this.replyRepository
      .createQueryBuilder('reply')
      .leftJoinAndSelect('reply.author', 'author')
      .where('reply.tweetId = :tweetId', { tweetId })
      .orderBy('reply.created_at', 'DESC')
      .select(['author.id', 'author.username', 'author.avatar', 'author.name'])
      .getMany();
    if (!replies.length || !replies)
      throw new NotFoundException('No Replies on This Tweet');
    return replies;
  }

  async getSingleReply(replyId: number) {
    const reply = await this.replyRepository.findOneBy({ id: replyId });
    if (!reply) throw new NotFoundException('Not Found Reply!');
    reply;
  }

  async deleteReply(req: Request, tweetId: number) {
    const reply = await this.replyRepository.findOneBy({
      id: tweetId,
      author: { id: req.headers['id'] },
    });
    if (!reply) throw new NotFoundException('Not Found Reply!');
    await this.replyRepository.delete({
      id: tweetId,
      author: { id: req.headers['id'] },
    });
    return { msg: 'Reply is Deleted!' };
  }

  async updateById(req: Request, body: any, replyId: number) {
    const userId = Number(req.headers['id']);
    await this.replyRepository.update(
      { id: replyId, author: { id: req.headers['id'] } },
      body,
    );
    return { msg: 'Reply is Updated!' };
  }

  async createReply(req: Request, body: any, tweetId: number) {
    const userId = Number(req.headers['id']);
    const user = await this.userRepository.findOneBy({ id: userId });
    const tweet = await this.tweetRepository.findOneBy({ id: tweetId });

    if (!user) throw new NotFoundException('User not found');
    if (!tweet) throw new NotFoundException('Tweet not found');

    const reply = this.replyRepository.create({
      content: body.content,
      media: body.media,
      author: user,
      tweet: tweet,
    });

    await this.replyRepository.save(reply);
    return { msg: 'Reply is Added' };
  }
}
