import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Response } from 'express';

@Controller('/api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/get-users')
  async findAll() {
    return this.userService.findAll();
  }

  @Get('/get-users/:id')
  async findById(@Param() param: { id: number }) {
    return this.userService.findById(param.id);
  }

  @Delete('/delete-user/:id')
  async deleteById(@Param() param: { id: number }) {
    return this.userService.deleteById(param.id);
  }

  @Put('/update-user/:id')
  async updateById(@Param() param: { id: number }, @Body() body) {
    return this.userService.updateById(param.id, body);
  }

  @Post('/sign-up')
  async signUp(@Body() body) {
    return this.userService.signUp(body);
  }

  @Post('/login')
  async login(@Res() res: Response, @Body() body) {
    return this.userService.login(body, res);
  }
}
