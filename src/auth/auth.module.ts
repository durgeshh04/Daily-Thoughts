import { Module } from '@nestjs/common';
import { AuthController } from './v1/auth.controller';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { AuthService } from './v1/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './utils/JwtStrategy';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN },
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [GoogleStrategy, AuthService, JwtStrategy],
})
export class AuthModule {}
