import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { getEnvConfig, setUpSwagger } from './config';
import { cookieLogger } from './middleware/cookie.logger';

const envConfig = getEnvConfig();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(cookieLogger);
  const port = envConfig.APP_PORT || 4200;
  console.log(`backend : http://localhos:${port}`);
  await setUpSwagger(app);
  await app.listen(port);
}

bootstrap();
