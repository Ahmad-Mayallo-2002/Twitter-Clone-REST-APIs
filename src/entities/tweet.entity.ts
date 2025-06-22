import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Reply } from './reply.entity';
import { Like } from './like.entity';
import { Dislike } from './dislikes.entity';

@Entity({ name: 'tweets' })
export class Tweet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  content?: string;

  @Column('simple-array', { nullable: true })
  media?: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
  // Start Relationships
  @ManyToOne(() => User, (user) => user.tweets)
  @JoinColumn()
  author: Relation<User>;

  @OneToMany(() => Reply, (reply) => reply.tweet, { eager: true })
  reply: Relation<Reply[]>;

  @OneToMany(() => Dislike, (like) => like.tweet, { eager: true })
  like: Relation<Like[]>;

  @OneToMany(() => Reply, (dislike) => dislike.tweet, { eager: true })
  dislike: Relation<Dislike[]>;
  // End Relationships
}
