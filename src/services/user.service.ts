import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { compare } from 'bcryptjs';
import { Response } from 'express';
import { sign } from 'jsonwebtoken';
import { log } from 'console';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(res: Response) {
    const users = await this.userRepository.find();
    if (!users.length) throw new NotFoundException('No Users Here!');
    return users;
  }

  async findById(id: number, res: Response) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User is not Exist!');
    return user;
  }

  async deleteById(id: number, res: Response) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('This User is not Found!');
    await this.userRepository.delete({ id });
    return res.status(200).json({ msg: 'User is Deleted!' });
  }

  async updateById(id: number, body: User, res: Response) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('This User is not Found!');
    await this.userRepository.update(id, body);
    return { msg: 'User is Updated!' };
  }

  async signUp(body: User, res: Response) {
    const currentUser = await this.userRepository.findOneBy({
      email: body.email,
    });
    if (currentUser)
      return res.status(404).json({ msg: 'This Email is Already Exist!' });
    const user = this.userRepository.create(body);
    await this.userRepository.save(user);
    return { msg: 'Signup is Done!' };
  }

  async login(body: User, res: Response) {
    const currentUser = await this.userRepository.findOneBy({
      email: body.email,
    });
    if (!currentUser) throw new NotFoundException('Invalid Email!');
    const comparePassword = await compare(body.password, currentUser.password);
    if (!comparePassword) throw new NotFoundException('Invalid Password!');
    const token = sign(
      {
        email: currentUser.email,
        id: currentUser.id,
        username: currentUser.username,
      },
      'jwt',
      { expiresIn: '1d' },
    );
    return res
      .cookie(
        'json',
        JSON.stringify({
          id: currentUser.id,
          role: currentUser.role,
          token,
        }),
      )
      .json({ token, id: currentUser.id, msg: 'Login is Done' });
  }
}
