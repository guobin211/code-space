import { DIST_PATH, PUBLIC_PATH, ROOT_PATH } from '../config.mjs';
import { getDevConfig } from './webpack.dev.mjs';
import { getProdConfig } from './webpack.prod.mjs';

export { getDevConfig, getProdConfig, getConfig };

export default function getConfig(env, config) {
  const isProduction = env === 'production';
  return isProduction ? getProdConfig(config) : getDevConfig(config);
}
