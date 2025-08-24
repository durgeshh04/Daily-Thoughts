import { Injectable } from '@nestjs/common';
import { FollowerRepository } from '../repositories/follower.repository';

@Injectable()
export class FollowerService {
  constructor(private readonly followerRepository: FollowerRepository) {}

  async getFollowStats(userId: string) {
    return this.followerRepository.getFollowStats(userId);
  }

  async followUser(userId: string, followUserId: string) {
    return this.followerRepository.followUser(userId, followUserId);
  }
}
