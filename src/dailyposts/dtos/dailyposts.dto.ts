import { IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DailyPostDto {
  @ApiProperty({ description: 'Write content for your post' })
  @IsString()
  content: string;

  @ApiProperty({ description: 'provide media for the post if needed' })
  @IsOptional()
  @IsString()
  media_url?: string;
}
