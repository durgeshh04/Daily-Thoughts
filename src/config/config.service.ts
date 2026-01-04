import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get nodeEnv(): string {
    return this.getOrThrow('NODE_ENV');
  }

  get port(): string {
    return this.getOrThrow('PORT');
  }

  get databaseUrl(): string {
    return this.getOrThrow('DATABASE_URL');
  }

  get jwtAccessSecret(): string {
    return this.getOrThrow('JWT_ACCESS_SECRET');
  }

  get jwtRefreshSecret(): string {
    return this.getOrThrow('JWT_REFRESH_SECRET');
  }

  private getOrThrow(key: string): string {
    const value = this.configService.get<string>(key);
    if (!value) {
      throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
  }
}
