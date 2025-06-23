import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ReplyService } from '../services/reply.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth.guard';

@Controller('api')
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @Get('/get-tweet-replies/:tweetId')
  async getTweetReply(@Param() params: { tweetId: number }) {
    return this.replyService.getTweetReply(params.tweetId);
  }

  @Get('/get-single-reply/:replyId')
  async getSinglReply(@Param() params: { replyId: number }) {
    return this.replyService.getSingleReply(params.replyId);
  }

  @UseGuards(AuthGuard)
  @Delete('/delete-reply/:tweetId')
  async deleteReply(@Req() req: Request, @Param() params: { tweetId: number }) {
    return this.replyService.deleteReply(req, params.tweetId);
  }

  @UseGuards(AuthGuard)
  @Put('/update-reply/:tweetId')
  @UseInterceptors(AnyFilesInterceptor())
  async updateReply(
    @Req() req: Request,
    @Param() params: { tweetId: number },
    @Body() body: any,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.replyService.updateById(req, body, params.tweetId, files);
  }

  @UseGuards(AuthGuard)
  @Post('/create-reply/:tweetId')
  @UseInterceptors(AnyFilesInterceptor())
  async create(
    @Req() req: Request,
    @Param() params: { tweetId: number },
    @Body() body: any,
    @UploadedFiles() file: Express.Multer.File[],
  ) {
    return this.replyService.createReply(req, body, params.tweetId, file);
  }
}
