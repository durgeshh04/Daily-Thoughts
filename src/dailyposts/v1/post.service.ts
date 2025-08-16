import { Injectable } from '@nestjs/common';
import { DailyPostsRepo } from '../repositories/post.repo';
import { DailyPostDto } from '../dtos/dailyposts.dto';

@Injectable()
export class DailyUserPostsService {
  constructor(private readonly dailyPostsRepo: DailyPostsRepo) {}
  async userDailyPosts(userId: string, post: DailyPostDto) {
    return this.dailyPostsRepo.userDailyPosts(userId, post);
  }

  async usersAllPosts(userId: string): Promise<object> {
    return this.dailyPostsRepo.usersAllPosts(userId);
  }

  async postById(userId: string, postId: string): Promise<object> {
    return this.dailyPostsRepo.postById(userId, postId);
  }
}
