import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DailyPosts } from '../entities/dailyposts.entity';
import { Repository } from 'typeorm';
import { DailyPostDto } from '../dtos/dailyposts.dto';
import { User } from 'src/user/entities/user.entity';
import { DailyPostCommonReponse } from '../dailypost.interface';

@Injectable()
export class DailyPostsRepo {
  constructor(
    @InjectRepository(User)
    private readonly userDetailsRepo: Repository<User>,
    @InjectRepository(DailyPosts)
    private readonly dailyPostsRepo: Repository<DailyPosts>,
  ) {}

  async findUser(userId: string): Promise<boolean> {
    const validUser = await this.userDetailsRepo.findOneBy({ userid: userId });
    if (!validUser) {
      return false;
    }
    return true;
  }

  async userDailyPosts(userId: string, post: DailyPostDto): Promise<object> {
    try {
      const userDetails = await this.userDetailsRepo.findOneBy({
        userid: userId,
      });
      if (!userDetails) {
        throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
      }
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

  async usersAllPosts(userId: string): Promise<object> {
    try {
      const userDetails = await this.userDetailsRepo.findOneBy({
        userid: userId,
      });
      if (!userDetails) {
        throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
      }
      const usersAllPosts = await this.dailyPostsRepo
        .createQueryBuilder('posts')
        .where('posts.userid = :userId', { userId })
        .select([
          'posts.postid',
          'posts.content',
          'posts.mediaUrl',
          'posts.createdat',
        ])
        .getMany();
      return usersAllPosts;
    } catch (error) {
      console.error(
        'error occurred while fetching the all posts of user',
        error.message,
      );
      throw new HttpException(
        'Got an error while fetching all post of the users api',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async postById(userId, postId): Promise<object> {
    try {
      const userDetails = await this.userDetailsRepo.findOneBy({
        userid: userId,
      });
      if (!userDetails) {
        throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
      }
      const usersDailyPost = await this.dailyPostsRepo
        .createQueryBuilder('posts')
        .where('posts.userid = :userId', { userId })
        .andWhere('posts.postid = :postId', { postId })
        .select([
          'posts.postid',
          'posts.content',
          'posts.mediaUrl',
          'posts.createdat',
        ])
        .getMany();

      if (!usersDailyPost) {
        throw new HttpException('post not found', HttpStatus.NOT_FOUND);
      }

      return usersDailyPost;
    } catch (error) {
      console.error(
        'Error occurred while fetching data of a post',
        error.message,
      );
      throw new HttpException(
        'Got an error while fetching data of a specific post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deletePostById(userId, postId): Promise<DailyPostCommonReponse> {
    try {
      const user = this.findUser(userId);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const validPost = await this.dailyPostsRepo.findOneBy({ postid: postId });
      if (!validPost) {
        throw new HttpException('post not found', HttpStatus.NOT_FOUND);
      }

      await this.dailyPostsRepo.delete({ postid: postId, userid: userId });

      return {
        success: true,
        timestamp: new Date(),
        message: 'post deleted successfully',
      };
    } catch (error) {
      console.error('Error occurred while deleting post', error.message);
      throw new HttpException(
        'Got an error while deleting the post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
