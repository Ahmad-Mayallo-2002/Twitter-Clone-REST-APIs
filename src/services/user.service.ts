import {
  Inject,
  Injectable,
  NotFoundException,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcryptjs';
import { Response } from 'express';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { CloudinaryService } from '../cloudinary.service';
import { log } from 'console';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async findAll() {
    const users = await this.userRepository
      .createQueryBuilder('users')
      .select([
        'users.id',
        'users.username',
        'users.name',
        'users.email',
        'users.bio',
        'users.location',
        'users.avatar',
        'users.cover',
        'users.created_at',
        'users.updated_at',
      ])
      .orderBy('users.created_at', 'DESC')
      .getMany();
    if (!users.length) throw new NotFoundException('No Users Here!');
    return users;
  }

  async findById(id: number) {
    const user = await this.userRepository
      .createQueryBuilder('users')
      .select([
        'users.id',
        'users.username',
        'users.name',
        'users.email',
        'users.bio',
        'users.location',
        'users.avatar',
        'users.cover',
        'users.created_at',
        'users.updated_at',
      ])
      .where('id = :id', { id })
      .orderBy('users.created_at', 'DESC')
      .getMany();
    if (!user) throw new NotFoundException('User is not Exist!');
    return user;
  }

  async deleteById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('This User is not Found!');
    await this.userRepository.delete({ id });
    return { msg: 'User is Deleted!' };
  }

  async updateById(id: number, body: User, files: Express.Multer.File[]) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('This User is not Found!');
    if (files.length) {
      const userFiles = await this.cloudinaryService.uploadFiles(files);
      files.forEach(
        (file, index) => (body[file.fieldname] = userFiles[index].url),
      );
    }
    await this.userRepository.update(id, body);
    return { msg: 'User is Updated!' };
  }

  async signUp(body: User, files: Express.Multer.File[]) {
    const currentUser = await this.userRepository.findOneBy({
      email: body.email,
    });
    const hashPassword = await hash(body.password, 10);
    if (currentUser)
      throw new NotFoundException('This Email is Already Exist!');
    if (files.length) {
      const userFiles = await this.cloudinaryService.uploadFiles(files);
      files.forEach((file, index) => {
        if (file) {
          body[file.fieldname] = userFiles[index].url;
        }
      });
    }
    const user = this.userRepository.create({
      ...body,
      password: hashPassword,
    });
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
    const jwt = this.configService.get('jwt');
    const token = sign(
      {
        email: currentUser.email,
        id: currentUser.id,
        username: currentUser.username,
      },
      jwt,
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
