import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './config/app.config';

@Injectable()
export class AppService {
  private config: AppConfig;
  constructor(private configService: ConfigService) {
    this.config = Object.assign({}, this.configService) as any;
  }

  getConfig(): AppConfig {
    return this.config;
  }

  getIndex(): string {
    return 'Hello NestJS!';
  }
}
