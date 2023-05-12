import { exec } from 'child_process';

(async () => {
  console.log('eslint processing...');
  console.time('eslint');
  exec(
    'eslint --config .config/.eslintrc --cache --cache-file .config/.eslintcache **/*.{ts,tsx,js,astro} --fix',
    (err, stdout, stderr) => {
      console.timeEnd('eslint');
      console.log(stdout);
      if (err) {
        console.log('receive err');
        console.log(err);
        process.exit(-1);
      }
      if (stderr) {
        console.log('receive stderr');
        if (stderr.startsWith('/bin/sh: warning')) {
          process.exit(0);
        }
        console.log(JSON.stringify(stderr));
        process.exit(-1);
      }
      process.exit(0);
    }
  );
})();
