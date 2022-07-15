import { getEnvConfig } from './env.config';

export function setUpRedis() {
  const { REDIS_URI } = getEnvConfig();
  console.log('REDIS_URI', REDIS_URI);
}
