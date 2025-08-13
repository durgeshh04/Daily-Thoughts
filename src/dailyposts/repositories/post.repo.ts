import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DailyPosts } from '../entities/dailyposts.entity';
import { Repository } from 'typeorm';
import { DailyPostDto } from '../dtos/dailyposts.dto';

@Injectable()
export class DailyPostsRepo {
  constructor(
    @InjectRepository(DailyPosts)
    private readonly dailyPostsRepo: Repository<DailyPosts>,
  ) {}

  async userDailyPosts(userId: string, post: DailyPostDto): Promise<object> {
    try {
      const createdPost = await this.dailyPostsRepo.create({
        userid: userId,
        content: post.content,
        mediaUrl: post.media_url,
      });
      const savedPost = await this.dailyPostsRepo.save(createdPost);
      return {
        postId: savedPost.postid,
        status: HttpStatus.CREATED,
        success: true,
        timestamp: new Date(),
        message: 'post uploaded successfully',
      };
    } catch (error) {
      console.error('error occurred while posting', error.message);
      throw new HttpException(
        'Got an error while uploading user post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
