import { execSync } from 'child_process';

(async () => {
  console.log('prettier processing...');
  console.time('prettier');
  const res = execSync(
    'prettier --config .config/.prettierrc --ignore-path ./.config/.prettierignore --loglevel warn --write "**/*.{ts,tsx,js,mjs,cjs}"'
  );
  console.timeEnd('prettier');
  const output = res.toString();
  if (output.length > 0) {
    console.log(output);
    process.exit(-1);
  }
})();
