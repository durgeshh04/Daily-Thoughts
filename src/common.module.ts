import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DailyUserPostsModule } from './dailyposts/post.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule, DailyUserPostsModule],
  controllers: [],
  providers: [],
})
export class CommonModule {}
