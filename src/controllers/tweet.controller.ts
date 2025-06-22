import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { TweetService } from '../services/tweet.service';
import { Response } from 'express';

@Controller('api')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Get('/get-tweets')
  async findAll() {
    return this.tweetService.getAll();
  }

  @Get('/get-tweets/:id')
  async findById(@Param() param: { id: number }) {
    return this.tweetService.getById(param.id);
  }

  @Delete('/delete-tweet/:id')
  async deleteById(@Param() param: { id: number }, @Req() req: Request) {
    return this.tweetService.deleteById(param.id, req);
  }

  @Put('/update-tweet/:id')
  async updateById(
    @Param() param: { id: number },
    @Body() body,
    @Req() req: Request,
  ) {
    return this.tweetService.updateById(param.id, body, req);
  }

  @Post('/create-tweet')
  async create(@Req() req: Request, @Body() body) {
    return this.tweetService.create(req, body);
  }
}
