import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Tweet } from '../entities/tweet.entity';
import { Repository } from 'typeorm';
import { Response } from 'express';

@Injectable()
export class TweetService {
  constructor(
    @Inject('TWEET_REPOSITORY')
    private readonly tweetRepository: Repository<Tweet>,
  ) {}

  async getAll(res: Response) {
    const tweets = await this.tweetRepository.find();
    if (!tweets.length) throw new NotFoundException('No Tweets!');
    return tweets;
  }

  async getById(id: number, res: Response) {
    const tweet = await this.tweetRepository.findOneBy({ id });
    if (!tweet) throw new NotFoundException('This Tweet is not Found!');
    return tweet;
  }

  async deleteById(id: number, res: Response, req: Request) {
    const tweet = await this.tweetRepository.findOneBy({
      id,
      author: req.headers['id'],
    });
    if (!tweet) throw new NotFoundException('This Tweet is not Found!');
    await this.tweetRepository.delete({ id });
    return { msg: 'Tweet is Deleted!' };
  }

  async updateById(id: number, res: Response, body, req: Request) {
    const tweet = await this.tweetRepository.findOneBy({
      id,
      author: req.headers['id'],
    });
    if (!tweet) throw new NotFoundException('This Tweet is not Found!');
    await this.tweetRepository.update({ id, author: req.headers['id'] }, body);
    return { msg: 'Tweet is Updated' };
  }

  async create(res: Response, body) {
    const tweet = this.tweetRepository.create(body);
    await this.tweetRepository.save(tweet);
    return { msg: 'Tweet is Created!' };
  }
}
