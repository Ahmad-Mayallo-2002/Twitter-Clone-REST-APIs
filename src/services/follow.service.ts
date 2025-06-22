import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Follow } from '../entities/follow.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FollowService {
  constructor(
    @Inject('FOLLOW_REPOSITORY')
    private readonly followRepository: Repository<Follow>,
  ) {}

  async getFollowers() {
    const followers = await this.followRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.follower', 'follower')
      .getMany();
    if (!followers.length)
      throw new NotFoundException('You Have No Followers!');
    return followers;
  }

  async getFollowings(req: Request) {
    const followings = await this.followRepository
      .createQueryBuilder('f')
      .leftJoinAndSelect('f.followings', 'followedUser')
      .where('f.follower.id = :id', { id: req.headers['id'] })
      .select([
        'followedUser.id',
        'followedUser.username',
        'followedUser.email',
        'followedUser.avatar',
        'followedUser.cover',
        'followedUser.location',
      ])
      .getRawMany();
    if (!followings.length)
      throw new NotFoundException('You Have not Follow any One!');
    return followings;
  }

  async addFollowing(req: Request, id: number) {
    const following = this.followRepository.create({
      follower: req.headers['id'],
      followings: { id },
    });
    await this.followRepository.save(following);
    return { msg: 'You Added Following' };
  }

  async removeFollowing(req: Request, id: number) {
    this.followRepository.delete({
      follower: req.headers['id'],
      followings: { id },
    });
    return { msg: 'You Removed Following' };
  }
}
