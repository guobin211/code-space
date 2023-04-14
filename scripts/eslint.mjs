import { execSync } from 'child_process';

(async () => {
  console.log('eslint processing...');
  console.time('eslint');
  const res = execSync(
    'eslint --config ./.config/.eslintrc.cjs --cache --cache-file ./.config/.eslintcache "**/*.{ts,tsx,js}" --fix'
  );
  console.timeEnd('eslint');
  const output = res.toString();
  if (output.length > 0) {
    console.log(output);
    process.exit(-1);
  }
})();
