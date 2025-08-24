import { HttpStatus } from '@nestjs/common';

export interface FollowStatCount {
  postsCount: number;
  followersCount: number;
  followingCount: number;
}

export interface FollowStatResponse {
  success: boolean;
  timestamp: Date;
  data: FollowStatCount;
}

export interface FollowUserResponse {
  success: boolean;
  status: number;
  timestamp: Date;
  message: string;
}
