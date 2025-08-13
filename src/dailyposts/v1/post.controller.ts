import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { DailyUserPostsService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { DailyPostDto } from '../dtos/dailyposts.dto';

@Controller({ path: 'Daily-Post', version: '1' })
export class DailyUserPostsController {
  constructor(private readonly dailyPostsService: DailyUserPostsService) {}

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Post('/user/daily/post')
  async userDailyPost(@Req() req, @Body() post: DailyPostDto) {
    const userId = req?.user?.userId;
    return this.dailyPostsService.userDailyPosts(userId, post);
  }
}
