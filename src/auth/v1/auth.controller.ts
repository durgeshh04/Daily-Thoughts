import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ description: 'This is registration api' })
  async googleAuth() {
    return;
  }

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({
    description: 'This api redirects to home page after successfully register',
  })
  async googleAuthRedirect(@Req() req) {
    return this.authService.handleGoogleLogin(req.user);
  }
}
