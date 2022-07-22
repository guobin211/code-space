import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { setUpConfig, setUpMongoDB, setUpMySQL } from './config';
import { CookieLoggerMiddleware } from './middleware/cookie.logger';

@Module({
  imports: [
    setUpConfig(),
    setUpMongoDB(),
    setUpMySQL(),
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CookieLoggerMiddleware)
      .forRoutes(AppController);
  }
}
