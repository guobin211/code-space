import { setUpConfig, getEnvConfig } from './app.config';
import { setUpMongoDB, setUpMySQL, setUpRedis } from './database.config';
import { setUpSwagger } from './swagger.config';

export {
  setUpConfig,
  setUpSwagger,
  getEnvConfig,
  setUpMongoDB,
  setUpRedis,
  setUpMySQL,
};
