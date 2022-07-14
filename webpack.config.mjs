import { getDevConfig, getProdConfig } from './__scripts__/webpack/index.mjs';

function getConfig(mode) {
  if (mode) {
    return getDevConfig();
  }
  return getProdConfig();
}

export default getConfig;
