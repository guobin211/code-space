import swc from '@swc/core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const save = (name, data) => {
  const dist = path.join(__dirname, 'dist');
  if (!fs.existsSync(dist)) {
    fs.mkdirSync(path.join(__dirname, 'dist'));
  }
  fs.writeFileSync(path.join(__dirname, name), data);
};

async function compileExample() {
  const file = path.join(__dirname, './example.tsx');
  const result = await swc
    .transformFile(file, {
      jsc: {
        parser: {
          syntax: 'typescript',
          decorators: true,
          dynamicImport: false,
        },
        transform: {
          legacyDecorator: true,
          decoratorMetadata: true,
          optimizer: {
            globals: {},
          },
        },
        target: 'es5',
        loose: false,
        externalHelpers: false,
        keepClassNames: false,
      },
    })
    .catch((err) => {
      console.log('compileExample err', err);
      return null;
    });
  if (result) {
    save('dist/example.js', result.code);
  }
}

async function compileUMD() {
  const file = path.join(__dirname, './android.ts');
  const result = await swc
    .transformFile(file, {
      jsc: {
        parser: {
          syntax: 'typescript',
          decorators: true,
        },
        target: 'es5',
        loose: false,
        externalHelpers: true,
      },
      module: {
        type: 'umd',
      },
    })
    .catch((err) => {
      console.log('compileUMD err', err);
      return null;
    });
  if (result) {
    save('dist/android.js', result.code);
  }
}

// ===========================================================================
// Main Function
(async () => {
  await Promise.all([compileUMD(), compileExample()]);
  console.log('done');
})();
