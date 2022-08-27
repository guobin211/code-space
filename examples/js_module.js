import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { createRequire } from 'module';
import { logger } from './basic_lib.mjs';

// ============================================================
// ESModule申明全局变量
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// ESModule导入CommonJS模块
const importCommonJs = (filepath) => {
  const nodeRequire = createRequire(import.meta.url);
  return nodeRequire(filepath);
};
const basicLib = importCommonJs('./basic_lib.cjs');
console.log('basicLib', basicLib);
const importJson = (filepath) => {
  const data = fs.readFileSync(filepath, 'utf8');
  return JSON.parse(data);
};
const pkg = importJson(path.resolve(__dirname, '../package.json'));

// ============================================================
// Nodejs全局变量
const printGlobal = () => {
  const g = globalThis || this || {};
  console.log('prototype', g.prototype);
  console.log('__proto__', g.__proto__);
  Object.keys(g).forEach((key) => {
    console.log(key, typeof g[key]);
  });
  // ES6 module + CommonJS module
  if (pkg.type !== 'module') {
    /// cjs的全局变量
    console.log('require', require);
    console.log('module', module);
    console.log('exports', exports);
    console.log('__dirname', __dirname);
    console.log('__filename', __filename);
  } else {
    console.log('meta', import.meta);
  }
};

// sleep
async function sleep(ms) {
  /**
    clearInterval function
    clearTimeout function
    setInterval function
    setTimeout function
    queueMicrotask function
    performance object
    clearImmediate function
    setImmediate function
   */
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function testEventLoop() {
  console.log('start');
  setTimeout(() => {
    console.log('1');
  }, 1);
  await sleep(1000);
  new Promise(() => {
    console.log('2');
  });
  setImmediate(() => {
    console.log('3');
  });
  console.log('end');
}

async function main() {
  console.log('__filename', __filename);
  console.log('__dirname', __dirname);
  printGlobal();
  testEventLoop();
  logger.info('info');
}

main();
