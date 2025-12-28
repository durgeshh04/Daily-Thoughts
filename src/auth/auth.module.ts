import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [BcryptProvider],
})
export class AuthModule {}
