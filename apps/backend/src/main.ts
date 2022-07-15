import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getEnvConfig, setUpSwagger } from './config';

const envConfig = getEnvConfig();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await setUpSwagger(app);
  await app.listen(envConfig.APP_PORT || 4200);
}

bootstrap();
