import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const importJson = (filepath) => {
  const data = fs.readFileSync(filepath, 'utf8');
  return JSON.parse(data);
};
const pkg = importJson(path.resolve(__dirname, '../package.json'));

const printGlobal = () => {
  const g = globalThis || this || {};
  console.log('prototype', g.prototype);
  console.log('__proto__', g.__proto__);
  Object.keys(g).forEach((key) => {
    console.log(key, typeof g[key]);
  });

  if (pkg.type !== 'module') {
    /// cjs的全局变量
    console.log('require', require);
    console.log('module', module);
    console.log('exports', exports);
    console.log('__dirname', __dirname);
    console.log('__filename', __filename);
  }
};

async function main() {
  console.log('__filename', __filename);
  console.log('__dirname', __dirname);
  printGlobal();
}

main();
