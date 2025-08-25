import { IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FollowUserDto {
  @ApiProperty()
  @IsString()
  followUserId: string;
}

export class UnfollowFollowUserDto {
  @ApiProperty()
  @IsString()
  unfollowUserId: string;
}
