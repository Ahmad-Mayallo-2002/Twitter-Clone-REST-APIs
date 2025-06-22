import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Response } from 'express';

@Controller('/api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/get-users')
  async findAll(res: Response) {
    return this.userService.findAll(res);
  }

  @Get('/get-users/:id')
  async findById(res: Response, @Param() param: { id: number }) {
    return this.userService.findById(param.id, res);
  }

  @Delete('/delete-user/:id')
  async deleteById(res: Response, @Param() param: { id: number }) {
    return this.userService.deleteById(param.id, res);
  }

  @Put('/update-user/:id')
  async updateById(
    @Param() param: { id: number },
    res: Response,
    @Body() body,
  ) {
    return this.userService.updateById(param.id, body, res);
  }

  @Post('/sign-up')
  async signUp(res: Response, @Body() body) {
    return this.userService.signUp(body, res);
  }

  @Post('/login')
  async login(res: Response, @Body() body) {
    return this.userService.login(body, res);
  }
}
