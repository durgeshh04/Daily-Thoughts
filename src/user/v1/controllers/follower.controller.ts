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
import { FollowerService } from '../services/follower.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FollowUserDto, UnfollowFollowUserDto } from '../dtos/follow.dto';

@Controller({ path: 'users', version: '1' })
export class FollowerController {
  constructor(private readonly followerService: FollowerService) {}
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Get('follow-stats')
  async getFollowStats(@Req() req) {
    const userId = req.user?.userId;
    return this.followerService.getFollowStats(userId);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Post('follow/request')
  async followUser(@Req() req, @Body() follow: FollowUserDto) {
    const userId = req.user?.userId;
    const followUserId = follow.followUserId;
    return this.followerService.followUser(userId, followUserId);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Delete('unfollow/request')
  async unfollowUser(@Req() req, @Body() unfollow: UnfollowFollowUserDto) {
    const userId = req.user?.userId;
    const unfollowUserId = unfollow.unfollowUserId;
    return this.followerService.unfollowUser(userId, unfollowUserId);
  }
}
