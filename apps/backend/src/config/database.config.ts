import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getEnvConfig, IS_PROD } from './app.config';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

export function setUpRedis() {
  // todo: 配置redis
}

export function setUpMongoDB() {
  return MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get('MONGO_URI') || 'mongodb://localhost/nestjs',
    }),
    inject: [ConfigService],
  });
}

export function setUpMySQL() {
  return TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const SQL_NAME = configService.get('SQL_NAME', 'root');
      const SQL_PASSWORD = configService.get('SQL_PASSWORD');
      const SQL_PORT = configService.get('SQL_PORT', 3306);
      const config: TypeOrmModuleOptions = {
        type: 'mysql',
        host: 'localhost',
        port: SQL_PORT,
        username: SQL_NAME,
        password: SQL_PASSWORD,
        database: 'nestjs',
        entities: [
          join(__dirname, '../**/*.entity{.ts,.js}'),
          join(__dirname, '../**/**/*.entity{.ts,.js}'),
        ],
        connectorPackage: 'mysql2',
        synchronize: true,
        autoLoadEntities: true,
        retryAttempts: IS_PROD ? 9 : 3,
      };
      return config;
    }
  });
}
