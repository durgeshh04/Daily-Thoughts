import { Module } from '@nestjs/common';
import { UserControllerV1 } from './v1/controllers/user.controller';
import { UserServiceV1 } from './v1/services/user.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowersEntity } from './entities/followers.entity';
import { FollowerController } from './v1/controllers/follower.controller';
import { FollowerService } from './v1/services/follower.service';
import { FollowerRepository } from './v1/repositories/follower.repository';
import { DailyUserPostsModule } from 'src/dailyposts/post.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, FollowersEntity]),
    DailyUserPostsModule,
  ],
  controllers: [UserControllerV1, FollowerController],
  providers: [
    //Services
    UserServiceV1,
    FollowerService,

    //Repositories
    FollowerRepository,
  ],
  exports: [UserServiceV1],
})
export class UserModule {}
