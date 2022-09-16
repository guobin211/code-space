import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';

/**
 * 环境变量，配置文件`.env`
 */
export interface EnvConfig {
  APP_NAME: string;
  APP_PORT: number;
  REDIS_URI: string;
  MONGO_URI: string;
  SQL_PORT: number;
  SQL_NAME: string;
  SQL_PASSWORD: string;
}

export type AppConfig = EnvConfig;

let config: EnvConfig;
export const IS_PROD = process.env.NODE_ENV === 'production';

export function getEnvConfig(): Partial<EnvConfig> {
  if (!config) {
    const { error, parsed } = dotenv.config();
    if (error) {
      console.error('getEnvConfig', error);
      process.exit(-1);
    }
    config = parsed as any;
  }
  return config;
}

export function setUpConfig() {
  return ConfigModule.forRoot({
    isGlobal: true,
  });
}
