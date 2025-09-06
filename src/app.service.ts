import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log('In the app service');
    throw new Error('Dummy Error for testing sentry integration');
    return 'Hello World!';
  }
}
