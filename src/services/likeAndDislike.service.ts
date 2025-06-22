import { Inject, Injectable } from '@nestjs/common';
import { Like } from '../entities/like.entity';
import { Repository } from 'typeorm';
import { Dislike } from '../entities/dislikes.entity';
import { Response } from 'express';

@Injectable()
export class LikeAndDislikeService {
  constructor(
    @Inject('LIKE_REPOSITORY')
    private readonly likesRepository: Repository<Like>,
    @Inject('DISLIKE_REPOSITORY')
    private readonly dislikeRepository: Repository<Dislike>,
  ) {}

  async addLike(req: Request, tweetId: number) {
    const userId = Number(req.headers['id']);
    const filter = { tweet: { id: tweetId }, user: { id: userId } };

    const currentLike = await this.likesRepository.findOneBy(filter);
    const currentDislike = await this.dislikeRepository.findOneBy(filter);

    if (currentDislike) await this.dislikeRepository.delete(filter);

    if (currentLike) {
      await this.likesRepository.delete(filter);
      return { msg: 'Like is Removed!' };
    } else {
      const like = this.likesRepository.create(filter);
      await this.likesRepository.save(like);
      return { msg: 'Like is Added!' };
    }
  }

  async addDislike(req: Request, tweetId: number) {
    const userId = Number(req.headers['id']);
    const filter = { tweet: { id: tweetId }, user: { id: userId } };

    const currentLike = await this.likesRepository.findOneBy(filter);
    const currentDislike = await this.dislikeRepository.findOneBy(filter);

    if (currentLike) await this.likesRepository.delete(filter);

    if (currentDislike) {
      await this.dislikeRepository.delete(filter);
      return { msg: 'Dislike is Removed!' };
    } else {
      const dislike = this.dislikeRepository.create(filter);
      await this.dislikeRepository.save(dislike);
      return { msg: 'Dislike is Added!' };
    }
  }

  async getTweetLikesCount(tweetId: number) {
    const likes = await this.likesRepository.count({
      where: { tweet: { id: tweetId } },
    });
    return { likes };
  }

  async getTweetDislikesCount(tweetId: number) {
    const dislikes = await this.dislikeRepository.count({
      where: { tweet: { id: tweetId } },
    });
    return { dislikes };
  }
}
