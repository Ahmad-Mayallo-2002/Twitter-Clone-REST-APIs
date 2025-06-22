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

  async addLike(req: Request, res: Response, tweetId: number) {
    const id = req.headers['id'];
    const filterObject = { tweet: { id: tweetId }, user: { id } };
    const currentLike = await this.likesRepository.findOneBy({
      id: tweetId,
      user: { id },
    });
    const currentDisLike = await this.dislikeRepository.findOneBy({
      id: tweetId,
      user: { id },
    });
    if (currentDisLike) await this.dislikeRepository.delete(filterObject);
    if (currentLike) {
      await this.likesRepository.delete(filterObject);
      return { msg: 'Like is Removed!' };
    } else {
      const like = this.likesRepository.create(filterObject);
      await this.likesRepository.save(like);
      return { msg: 'Like is Added!' };
    }
  }

  async addDislike(req: Request, res: Response, tweetId: number) {
    const id = req.headers['id'];
    const filterObject = { tweet: { id: tweetId }, user: { id } };
    const currentLike = await this.likesRepository.findOneBy({
      id: tweetId,
      user: { id },
    });
    const currentDisLike = await this.dislikeRepository.findOneBy({
      id: tweetId,
      user: { id },
    });
    if (currentLike) await this.likesRepository.delete(filterObject);
    if (currentDisLike) {
      await this.dislikeRepository.delete(filterObject);
      return { msg: 'Dislike is Removed!' };
    } else {
      const dislike = this.dislikeRepository.create(filterObject);
      await this.dislikeRepository.save(dislike);
      return { msg: 'Dislike is Added!' };
    }
  }

  async getTweetLikesCount(res: Response, tweetId: number) {
    const likes = await this.likesRepository.findBy({ tweet: { id: tweetId } });
    return { likes };
  }

  async getTweetDislikesCount(res: Response, tweetId: number) {
    const dislikes = await this.dislikeRepository.findBy({
      tweet: { id: tweetId },
    });
    return { dislikes };
  }
}
