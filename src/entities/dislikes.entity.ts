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

@Entity({ name: 'dislikes' })
export class Dislike {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  // Start Relationships
  @ManyToOne(() => User, (user) => user.dislike)
  user: Relation<User>;

  @ManyToOne(() => Tweet, (tweet) => tweet.dislike)
  tweet: Relation<Tweet>;
  // End Relationships
}
