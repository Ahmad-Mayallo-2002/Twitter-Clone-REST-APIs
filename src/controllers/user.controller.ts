import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Response } from 'express';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth.guard';

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

  @UseGuards(AuthGuard)
  @Delete('/delete-user/:id')
  async deleteById(@Param() param: { id: number }) {
    return this.userService.deleteById(param.id);
  }

  @UseGuards(AuthGuard)
  @Put('/update-user/:id')
  @UseInterceptors(AnyFilesInterceptor())
  async updateById(
    @Param() param: { id: number },
    @Body() body,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.userService.updateById(param.id, body, files);
  }

  @Post('/sign-up')
  @UseInterceptors(AnyFilesInterceptor())
  async signUp(@Body() body, @UploadedFiles() files: Express.Multer.File[]) {
    return this.userService.signUp(body, files);
  }

  @Post('/login')
  async login(@Res() res: Response, @Body() body) {
    return this.userService.login(body, res);
  }
}
