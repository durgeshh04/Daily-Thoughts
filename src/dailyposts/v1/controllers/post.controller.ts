import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DailyUserPostsService } from '../services/post.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { DailyPostDto } from '../../dtos/dailyposts.dto';

@Controller({ path: 'dailypost', version: '1' })
export class DailyUserPostsController {
  constructor(private readonly dailyPostsService: DailyUserPostsService) {}

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Post('/user/daily/post')
  async userDailyPost(@Req() req, @Body() post: DailyPostDto) {
    const userId = req?.user?.userId;
    return this.dailyPostsService.userDailyPosts(userId, post);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Get('/users/all/post')
  async usersAllPosts(@Req() req) {
    const userId = req?.user?.userId;
    return this.dailyPostsService.usersAllPosts(userId);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Get('/user/post/:postid')
  async postById(@Req() req, @Param('postid') postId: string) {
    const userId = req?.user?.userId;
    return this.dailyPostsService.postById(userId, postId);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete/post/:postid')
  async deletePostById(@Req() req, @Param('postid') postId: string) {
    const userId = req?.user?.userId;
    return this.dailyPostsService.deletePostById(userId, postId);
  }
}
