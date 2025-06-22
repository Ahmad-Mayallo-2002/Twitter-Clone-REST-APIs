import { Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'follows' })
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.follower, { onDelete: 'CASCADE' })
  follower: Relation<User>;

  @ManyToOne(() => User, (user) => user.followings, { onDelete: 'CASCADE' })
  followings: Relation<User>;
}
