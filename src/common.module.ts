import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class CommonModule {}
