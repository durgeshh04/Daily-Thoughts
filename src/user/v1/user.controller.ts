import { Controller, Get } from '@nestjs/common';
import { UserServiceV1 } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('user controller')
@Controller({ path: 'user', version: 'v1' })
export class UserControllerV1 {
  constructor(private readonly userServicev1: UserServiceV1) {}
  @Get('/get/details')
  @ApiOperation({ description: 'Get all users' })
  async getUserDetails() {
    return this.userServicev1.getUserDetails();
  }
}
