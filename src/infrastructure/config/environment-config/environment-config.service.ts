import { ClodinaryConfig } from '@/domain/config/cloudinary.interface';
import { DatabaseConfig } from '@/domain/config/database.interface';
import { JWTConfig } from '@/domain/config/jwt.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService
  implements DatabaseConfig, JWTConfig, ClodinaryConfig
{
  constructor(private configService: ConfigService) {}
  getDatabaseURL(): string {
    return this.configService.get('DATABASE_URL');
  }
  getCloudinaryCloudName(): string {
    return this.configService.get<string>('CLOUDINARY_NAME');
  }
  getCloudinaryApiKey(): string {
    return this.configService.get<string>('CLOUDINARY_API_KEY');
  }
  getCloudinaryApiSecret(): string {
    return this.configService.get<string>('CLOUDINARY_API_SECRET');
  }
  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }
  getJwtExpirationTime(): string {
    return this.configService.get<string>('JWT_EXPIRATION_TIME');
  }
  getJwtRefreshSecret(): string {
    return this.configService.get<string>('JWT_REFRESH_SECRET');
  }
  getJwtRefreshExpirationTime(): string {
    return this.configService.get<string>('JWT_REFRESH_EXPIRATION_TIME');
  }
}
