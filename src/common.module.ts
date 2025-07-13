import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database/database.module';
import { UserModule } from './user/v1/user.module';
import { AuthModule } from './auth/v1/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class CommonModule {}
