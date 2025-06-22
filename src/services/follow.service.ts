import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Follow } from '../entities/follow.entity';
import { Repository } from 'typeorm';
import { Response } from 'express';

@Injectable()
export class FollowService {
  constructor(
    @Inject('FOLLOW_REPOSITORY')
    private readonly followRepository: Repository<Follow>,
  ) {}

  async getFollowers(res: Response, userId: number) {
    const followers = await this.followRepository.findBy({
      followings: { id: userId },
    });
    if (!followers.length)
      throw new NotFoundException('You Have No Followers!');
    return followers;
  }

  async getFollowings(req: Request, res: Response) {
    const followings = await this.followRepository.findBy({
      follower: { id: req.headers['id'] },
    });
    if (!followings.length)
      throw new NotFoundException('You Have not Follow any One!');
    return followings;
  }

  async addFollowing(req: Request, res: Response, followingId: number) {
    const following = this.followRepository.create({
      follower: req.headers['id'],
      followings: { id: followingId },
    });
    await this.followRepository.save(following);
    return { msg: 'You Added Following' };
  }

  async removeFollowing(req: Request, res: Response, followingId: number) {
    this.followRepository.delete({
      follower: req.headers['id'],
      followings: { id: followingId },
    });
    return { msg: 'You Removed Following' };
  }
}
