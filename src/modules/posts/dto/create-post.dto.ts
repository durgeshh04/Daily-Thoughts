import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PostType } from '../enums/post-type.enum';
import { PostStatus } from '../enums/post-status.enum';

export class CreatePostDto {
  @ApiProperty({
    example: 'This is title',
    description: 'This is the title field of the post',
  })
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    enum: PostType,
    description: 'Possible values: "post", "story", "page", "series"',
  })
  @IsString()
  @IsEnum(PostType)
  postType: PostType;

  @ApiPropertyOptional({
    description: 'This is slug property',
    example: 'my-url',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and use only "-" and without spaces. for ex: "my-url"',
  })
  slug: string;

  @ApiProperty({
    description: 'Possible status: "draft", "scheduled", "review", "published"',
    enum: PostStatus,
  })
  @IsEnum(PostStatus)
  @IsNotEmpty()
  status: PostStatus;

  @ApiPropertyOptional({
    description: 'Provide content for the post',
    example: 'This is content of this post',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MinLength(10)
  content?: string;

  @ApiPropertyOptional({
    description: 'This is schema property',
    example: { hello: 'world' },
    required: false,
  })
  @IsJSON()
  @IsOptional()
  schema?: string;

  @ApiPropertyOptional({
    description: 'Provide image url of the post',
    example: 'www.shutter.jpg',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  featuredImageUrl?: string;

  @ApiPropertyOptional({
    description: 'This is date property saved on each post',
    required: false,
  })
  @IsISO8601()
  @IsOptional()
  publishOn?: Date;

  @ApiProperty({ type: [String], description: 'provide tags for the post' })
  @IsArray()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  tags: string[];
}
