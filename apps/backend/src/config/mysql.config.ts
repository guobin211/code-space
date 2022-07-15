import { TypeOrmModule } from '@nestjs/typeorm';
import { getEnvConfig, IS_PROD } from './env.config';

export function setUpMySQL() {
  const { SQL_NAME, SQL_PASSWORD } = getEnvConfig();
  return TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: SQL_NAME,
    password: SQL_PASSWORD,
    database: 'nestjs',
    entities: ['src/**/**.entity{.ts,.js}'],
    connectorPackage: 'mysql2',
    synchronize: true,
    retryAttempts: IS_PROD ? 9 : 3,
  });
}
