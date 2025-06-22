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

  async getAll() {
    const tweets = await this.tweetRepository
      .createQueryBuilder('tweet')
      .leftJoinAndSelect('tweet.author', 'author')
      .leftJoinAndSelect('tweet.reply', 'reply')
      .leftJoinAndSelect('tweet.like', 'like')
      .leftJoinAndSelect('tweet.dislike', 'dislike')
      .orderBy('tweet.created_at', 'DESC')
      .select([
        'tweet.id',
        'tweet.content',
        'tweet.media',
        'tweet.created_at',
        'author.id',
        'author.username',
        'author.avatar',
        'author.name',
      ])
      .getMany();
    if (!tweets.length) throw new NotFoundException('No Tweets!');
    return tweets;
  }

  async getById(id: number) {
    const tweet = await this.tweetRepository
      .createQueryBuilder('tweet')
      .leftJoinAndSelect('tweet.author', 'author')
      .leftJoinAndSelect('tweet.reply', 'reply')
      .leftJoinAndSelect('tweet.like', 'like')
      .leftJoinAndSelect('tweet.dislike', 'dislike')
      .where('tweet.id = :tweetId', { tweetId: id })
      .orderBy('tweet.created_at', 'DESC')
      .select([
        'tweet.id',
        'tweet.content',
        'tweet.media',
        'tweet.created_at',
        'author.id',
        'author.username',
        'author.avatar',
      ])
      .getOne();
    if (!tweet) throw new NotFoundException('This Tweet is not Found!');
    return tweet;
  }

  async deleteById(id: number, req: Request) {
    const tweet = await this.tweetRepository.findOneBy({
      id,
      author: { id: req.headers['id'] },
    });
    if (!tweet) throw new NotFoundException('This Tweet is not Found!');
    await this.tweetRepository.delete({
      id,
      author: { id: req.headers['id'] },
    });
    return { msg: 'Tweet is Deleted!' };
  }

  async updateById(id: number, body, req: Request) {
    const tweet = await this.tweetRepository.findOneBy({
      id,
      author: { id: req.headers['id'] },
    });
    if (!tweet) throw new NotFoundException('This Tweet is not Found!');
    await this.tweetRepository.update({ id, author: req.headers['id'] }, body);
    return { msg: 'Tweet is Updated' };
  }

  async create(req: Request, body) {
    const tweet = this.tweetRepository.create({
      author: { id: req.headers['id'] },
      ...body,
    });
    await this.tweetRepository.save(tweet);
    return { msg: 'Tweet is Created!' };
  }
}
