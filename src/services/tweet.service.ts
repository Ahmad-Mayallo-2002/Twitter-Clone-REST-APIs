import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Tweet } from '../entities/tweet.entity';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { CloudinaryService } from '../cloudinary.service';

@Injectable()
export class TweetService {
  constructor(
    @Inject('TWEET_REPOSITORY')
    private readonly tweetRepository: Repository<Tweet>,
    private readonly cloudinaryService: CloudinaryService,
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

  async updateById(
    id: number,
    body,
    req: Request,
    files: Express.Multer.File[],
  ) {
    const tweet = await this.tweetRepository.findOneBy({
      id,
      author: { id: req.headers['id'] },
    });
    if (!tweet) throw new NotFoundException('This Tweet is not Found!');
    if (files?.length) {
      const tweetFiles = await this.cloudinaryService.uploadFiles(files);
      body.media = tweetFiles.map((file) => file.secure_url); // ✅ assign to tweet
    }
    await this.tweetRepository.update({ id, author: req.headers['id'] }, body);
    return { msg: 'Tweet is Updated' };
  }

  async create(req: Request, body, files: Express.Multer.File[]) {
    const tweet = this.tweetRepository.create({
      author: { id: req.headers['id'] },
      content: body.content,
    });
    if (files?.length) {
      const tweetFiles = await this.cloudinaryService.uploadFiles(files);
      tweet.media = tweetFiles.map((file) => file.url); // ✅ assign to tweet
    }
    await this.tweetRepository.save(tweet);
    return { msg: 'Tweet is Created!' };
  }
}
