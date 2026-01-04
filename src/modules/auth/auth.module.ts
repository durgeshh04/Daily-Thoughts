import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';
import { AuthService } from './providers/auth.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    AuthService,
    // The following structure used for defining the abstract class and the methods of the class are used in the another class that is useClass
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
  ],
  exports: [AuthService, HashingProvider],
})
export class AuthModule {}
