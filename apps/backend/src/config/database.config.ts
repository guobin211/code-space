import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getEnvConfig, IS_PROD } from './app.config';
import { join } from 'path';

export function setUpRedis() {
  // todo: 配置redis
}

export function setUpMongoDB() {
  const { MONGO_URI = 'mongodb://localhost/nestjs' } = getEnvConfig();
  return MongooseModule.forRoot(MONGO_URI);
}

export function setUpMySQL() {
  const { SQL_NAME, SQL_PASSWORD, SQL_PORT = 3306 } = getEnvConfig();
  const config: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: SQL_PORT,
    username: SQL_NAME,
    password: SQL_PASSWORD,
    database: 'nestjs',
    entities: [join(__dirname, '../**/*.entity{.ts,.js}'), join(__dirname, '../**/**/*.entity{.ts,.js}')],
    connectorPackage: 'mysql2',
    synchronize: true,
    autoLoadEntities: true,
    retryAttempts: IS_PROD ? 9 : 3,
  };
  console.log('MySQL config:', config);
  return TypeOrmModule.forRoot(config);
}
