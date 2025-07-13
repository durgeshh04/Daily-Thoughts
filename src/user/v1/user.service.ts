import { Injectable } from '@nestjs/common';

@Injectable()
export class UserServiceV1 {
  async getUserDetails() {
    return 'hello user';
  }
}
