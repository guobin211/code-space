import { ConfigModule } from '@nestjs/config';

export interface EnvConfig {
  APP_NAME: string;
  APP_PORT: number;
  REDIS_URI: string;
  MONGO_URI: string;
  SQL_NAME: string;
  SQL_PASSWORD: string;
}

export function getEnvConfig(): Partial<EnvConfig> {
  return process.env as object;
}

export function setUpConfig() {
  return ConfigModule.forRoot();
}
