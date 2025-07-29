import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserServiceV1 } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('user controller')
@Controller({ path: 'user', version: '1' })
export class UserControllerV1 {
  constructor(private readonly userService: UserServiceV1) {}
  @Get('/get/details')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ description: 'Get Profile Details' })
  async getUserDetails(@Req() req) {
    const userId = req.user?.userId;
    return this.userService.getUserDetails(userId);
  }
}
