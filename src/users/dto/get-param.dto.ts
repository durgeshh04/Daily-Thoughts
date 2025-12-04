import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class GetUserDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id: number;
}
