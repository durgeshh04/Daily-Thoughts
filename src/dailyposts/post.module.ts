import { Module } from '@nestjs/common';
import { DailyUserPostsService } from './v1/services/post.service';
import { DailyUserPostsController } from './v1/controllers/post.controller';
import { DailyPostsRepo } from './repositories/post.repo';
import { DailyPosts } from './entities/dailyposts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DailyPosts, User])],
  controllers: [DailyUserPostsController],
  providers: [
    //services
    DailyUserPostsService,

    // Repositories
    DailyPostsRepo,
  ],
  exports: [DailyPostsRepo],
})
export class DailyUserPostsModule {}
