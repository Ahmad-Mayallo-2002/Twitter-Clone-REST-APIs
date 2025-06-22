import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Tweet } from './tweet.entity';

@Entity({ name: 'replies' })
export class Reply {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  content?: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  media?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
  // Start Relationships
  @ManyToOne(() => User, (user) => user.reply)
  user: Relation<User>;

  @ManyToOne(() => Tweet, (tweet) => tweet.reply, { onDelete: 'CASCADE' })
  tweet: Relation<Tweet>;
  // End Relationships
}
