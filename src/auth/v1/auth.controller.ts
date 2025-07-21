import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { GoogleOAuthGuard } from '../guards/AuthGuard';
import { AuthService } from './auth.service';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('/google-register')
  @UseGuards(GoogleOAuthGuard)
  @ApiOperation({ description: 'This is registration api' })
  async authRegister(@Request() req) {}

  @Get('/google-redirect')
  @UseGuards(GoogleOAuthGuard)
  @ApiOperation({
    description: 'This api redirects to home page after successfully register',
  })
  async googleAuthRedirect(@Request() req) {
    return this.authService.googleLogin(req);
  }
}
