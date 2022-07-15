import { setUpConfig, getEnvConfig } from './env.config';
import { setUpMongoDB } from './mongodb.config';
import { setUpMySQL } from './mysql.config';
import { setUpRedis } from './redis.config';
import { setUpSwagger } from './swagger.config';

export {
  setUpConfig,
  setUpSwagger,
  getEnvConfig,
  setUpMongoDB,
  setUpRedis,
  setUpMySQL,
};
