import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller({ path: 'auth', version: 'v1' })
export class AuthController {
  constructor() {}
  @Get('/google/register')
  @ApiOperation({ description: 'This is registration api' })
  async authRegister() {
    return { msg: 'hello' };
  }

  @Get('/google/redirect')
  @ApiOperation({
    description: 'This api redirects to home page after successfully register',
  })
  async handleRedirect() {
    return { msg: 'redirecting' };
  }
}
