import path from 'path';
import { fileURLToPath } from 'url';
import { ROOT_PATH } from './config.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ===========================================================================
// Async Main Function
(async () => {
  console.log('🚀  Starting service worker...', ROOT_PATH);
  console.log(import.meta);
  console.log('__dirname', __dirname);
})();
