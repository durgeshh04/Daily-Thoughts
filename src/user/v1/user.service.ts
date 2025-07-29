import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserServiceV1 {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async getUserDetails(userId: string): Promise<object> {
    try {
      const userData = await this.userRepo.findOneBy({ userid: userId });
      if (!userData) {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      }
      return userData;
    } catch (error) {
      throw new HttpException(
        'error occurred while fetching profile details',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findByGoogleId(googleId: string): Promise<User | any> {
    return await this.userRepo.findOne({ where: { googleid: googleId } });
  }

  async create(data: Partial<User>): Promise<User> {
    try {
      const user = await this.userRepo.create(data);
      return this.userRepo.save(user);
    } catch (error) {
      throw new HttpException(
        'error occurred while creating the new user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateRefreshToken(userId: string, token: string) {
    try {
      await this.userRepo.update(userId, { refreshtoken: token });
    } catch (error) {
      throw new HttpException(
        'error while updating the refresh token',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
