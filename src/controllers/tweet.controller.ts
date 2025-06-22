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
  async findAll(@Res() res: Response) {
    return this.tweetService.getAll(res);
  }

  @Get('/get-tweets/:id')
  async findById(@Res() res: Response, @Param() param: { id: number }) {
    return this.tweetService.getById(param.id, res);
  }

  @Delete('/delete-tweet/:id')
  async deleteById(
    @Res() res: Response,
    @Param() param: { id: number },
    @Req() req: Request,
  ) {
    return this.tweetService.deleteById(param.id, res, req);
  }

  @Put('/update-tweet/:id')
  async updateById(
    @Res() res: Response,
    @Param() param: { id: number },
    @Body() body,
    @Req() req: Request,
  ) {
    return this.tweetService.updateById(param.id, res, body, req);
  }

  @Post('/create-tweet')
  async create(@Res() res: Response, @Body() body) {
    return this.tweetService.create(res, body);
  }
}
