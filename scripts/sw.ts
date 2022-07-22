import { ROOT_PATH } from './config.mjs';

async function run() {
  console.log('🚀  Starting service worker...', ROOT_PATH);
  console.log(import.meta);
}

run();
