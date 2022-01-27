import { DIST_PATH, PUBLIC_PATH, ROOT_PATH } from './config.mjs';
import { getDevConfig } from './webpack.dev.mjs';
import { getProdConfig } from './webpack.prod.mjs';

export { ROOT_PATH, PUBLIC_PATH, DIST_PATH, getDevConfig, getProdConfig };
