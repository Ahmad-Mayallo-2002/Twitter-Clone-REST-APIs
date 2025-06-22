import { hash, hashSync } from 'bcryptjs';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Tweet } from './tweet.entity';
import { Reply } from './reply.entity';
import { Like } from './like.entity';
import { Dislike } from './dislikes.entity';
import { IsDate, IsEmail, IsEmpty, Length } from 'class-validator';
import { Follow } from './follow.entity';
import { log } from 'console';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsEmpty({ message: 'Username is Required', always: true })
  @Column({ type: 'varchar', nullable: false, length: 100 })
  username: string;

  @IsEmpty({ message: 'Name is Required', always: true })
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @IsEmpty({ message: 'Email is Required', always: true })
  @IsEmail()
  @Column({ type: 'varchar', nullable: false, length: 100 })
  email: string;

  @IsEmpty({ message: 'Email is Required', always: true })
  @Length(9, 20, { message: 'Password Characters between 9 and 20' })
  @Column({ type: 'varchar', nullable: false, length: 100 })
  password: string;

  @IsEmpty({ message: 'Role is Required', always: true })
  @Column({
    type: 'varchar',
    nullable: false,
    length: 25,
    default: 'user',
    enum: ['user', 'admin'],
  })
  role: string;

  @Column({ type: 'text', nullable: false, default: 'Hello, World!' })
  bio: string;

  @IsEmpty({ message: 'Location is Required', always: true })
  @Column({ type: 'varchar', length: 255, nullable: false })
  location: string;

  @Column({ type: 'varchar', length: 255, default: 'avatar.jpg' })
  avatar: string;

  @Column({ type: 'varchar', length: 255, default: 'cover.jpg' })
  cover: string;

  @IsDate({ message: 'Invalid Date!' })
  @CreateDateColumn()
  created_at: Date;

  @IsDate({ message: 'Invalid Date!' })
  @UpdateDateColumn()
  updated_at: Date;

  // Start Relationships
  @OneToMany((type) => Tweet, (tweets) => tweets.author, { eager: true })
  tweets: Relation<Tweet>[];

  @OneToMany((type) => Like, (like) => like.tweet, { eager: true })
  like: Relation<Like>[];

  @OneToMany((type) => Reply, (dislike) => dislike.tweet, { eager: true })
  dislike: Relation<Dislike>[];

  @OneToMany((type) => Reply, (reply) => reply.user, { eager: true })
  reply: Relation<Reply>[];

  @OneToMany(() => Follow, (follow) => follow.followings)
  followings: Relation<Follow>[];

  @OneToMany(() => Follow, (follow) => follow.follower)
  follower: Relation<Follow>[];
  // End Relationships

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}

log('123456789', hashSync('123456789', 10));
