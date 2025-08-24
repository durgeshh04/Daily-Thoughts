import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowersEntity } from 'src/user/entities/followers.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import {
  FollowStatCount,
  FollowStatResponse,
  FollowUserResponse,
} from '../interfaces/follow.interface';
import { DailyPostsRepo } from 'src/dailyposts/repositories/post.repo';

@Injectable()
export class FollowerRepository {
  constructor(
    @InjectRepository(FollowersEntity)
    private readonly followerStatsRepo: Repository<FollowersEntity>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly dailyPostsRepo: DailyPostsRepo,
  ) {}
  private async userCheck(userId: string): Promise<boolean> {
    const existingUser = await this.userRepo.findOneBy({ userid: userId });

    if (!existingUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return true;
  }

  async getFollowStats(userId: string): Promise<FollowStatResponse> {
    try {
      await this.userCheck(userId);

      const [followerStats, followersCount] =
        await this.followerStatsRepo.findAndCountBy({
          userid: userId,
        });

      const [followingStats, followingCount] =
        await this.followerStatsRepo.findAndCountBy({
          followerid: userId,
        });

      const postsData = await this.dailyPostsRepo.usersAllPosts(userId);

      const followStatCount: FollowStatCount = {
        postsCount: postsData?.totalCount,
        followersCount: followersCount,
        followingCount: followingCount,
      };

      return {
        success: true,
        timestamp: new Date(),
        data: followStatCount,
      };
    } catch (err) {
      console.error(
        'error occurred while fetching stats of follow',
        err.message,
      );
      throw new HttpException(
        'Got an error while fetching the stats of the follow and following',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async followUser(
    userId: string,
    followUserId: string,
  ): Promise<FollowUserResponse> {
    try {
      await this.userCheck(userId);

      if (userId == followUserId) {
        throw new BadRequestException("Can't follow yourself");
      }

      const existingFollow = await this.followerStatsRepo.findOneBy({
        userid: followUserId,
        followerid: userId,
      });

      if (existingFollow) {
        throw new BadRequestException('Already following this user');
      }

      const follow = this.followerStatsRepo.create({
        userid: followUserId,
        followerid: userId,
      });

      await this.followerStatsRepo.save(follow);

      const response = {
        success: true,
        status: HttpStatus.CREATED,
        timestamp: new Date(),
        message: 'followed successfully',
      };

      return response;
    } catch (error) {
      console.error('error occurred while following other user', error.message);
      throw new HttpException(
        'Got an error while following other user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
