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

  @Column('text', {
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
  @ManyToOne(() => User, (user) => user.tweets)
  @JoinColumn()
  author: Relation<User>;

  @OneToMany(() => Reply, (reply) => reply.tweet, { eager: true })
  reply: Relation<Reply[]>;

  @OneToMany(() => Dislike, (dislike) => dislike.tweet, { eager: true })
  like: Relation<Like[]>;

  @OneToMany(() => Like, (like) => like.tweet, { eager: true })
  dislike: Relation<Dislike[]>;
  // End Relationships
}
