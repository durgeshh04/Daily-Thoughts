import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}
  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
