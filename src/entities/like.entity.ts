import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Tweet } from './tweet.entity';
import { User } from './user.entity';

@Entity({ name: 'likes' })
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;
  // Start Relationships
  @ManyToOne(() => User, (user) => user.like)
  user: Relation<User>;

  @ManyToOne(() => Tweet, (tweet) => tweet.like)
  tweet: Relation<Tweet>;
  // End Relationships
}
