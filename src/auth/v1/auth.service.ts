import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserServiceV1 } from 'src/user/v1/user.service';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserServiceV1,
  ) {}
  async handleGoogleLogin(user: any) {
    const existingUser = await this.userService.findByGoogleId(user.googleid);
    let createdUser = existingUser;
    if (!existingUser) {
      createdUser = await this.userService.create(user);
    }

    const payload = { sub: createdUser.userid, email: createdUser.email };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_SECRET,
      expiresIn: '7d',
    });

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userService.updateRefreshToken(
      createdUser.userid,
      hashedRefreshToken,
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
