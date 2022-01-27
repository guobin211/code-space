import path from 'node:path';
import { getDevConfig, getProdConfig } from './common/index.mjs';
import { ROOT_PATH } from './common/config.mjs';

function getConfig(mode) {
  if (mode) {
    return getDevConfig({
      entry: {
        main: path.join(ROOT_PATH, 'playground/src/main.tsx')
      }
    });
  }
  return getProdConfig({
    entry: {
      main: path.join(ROOT_PATH, 'playground/src/main.tsx')
    }
  });
}

export default getConfig;
