import { Module } from '@nestjs/common';
import { UserControllerV1 } from './v1/user.controller';
import { UserServiceV1 } from './v1/user.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserControllerV1],
  providers: [UserServiceV1],
  exports: [UserServiceV1],
})
export class UserModule {}
