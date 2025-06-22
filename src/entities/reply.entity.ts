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

  @Column({
    type: 'text',
    nullable: true,
    transformer: {
      to: (value: string[]) => JSON.stringify(value),
      from: (value: string) => JSON.parse(value),
    },
  })
  media?: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
  // Start Relationships
  @ManyToOne(() => User, (user) => user.reply)
  author: Relation<User>;

  @ManyToOne(() => Tweet, (tweet) => tweet.reply, { onDelete: 'CASCADE' })
  tweet: Relation<Tweet>;
  // End Relationships
}
