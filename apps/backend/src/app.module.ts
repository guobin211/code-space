import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { setUpConfig, setUpMongoDB, setUpMySQL } from './config';

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
export class AppModule {
}
