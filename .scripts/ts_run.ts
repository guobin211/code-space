import path from 'path';
import { fileURLToPath } from 'url';
import { swc_config } from './env_config.mjs';
import { getConfig } from './webpack/index.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===========================================================================
// async main function
(async () => {
  console.log('🚀 starting service worker... ');
  console.log(swc_config);
  console.log('__dirname', __dirname);
  const webpack_config = getConfig();
  console.log('webpack_config', webpack_config);
})();
