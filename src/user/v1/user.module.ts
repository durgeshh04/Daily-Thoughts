import { Module } from '@nestjs/common';
import { UserControllerV1 } from './user.controller';
import { UserServiceV1 } from './user.service';

@Module({
  controllers: [UserControllerV1],
  providers: [UserServiceV1],
})
export class UserModule {}
