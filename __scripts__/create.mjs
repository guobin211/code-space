import { spawnSync } from 'child_process';

function createCargoLib(name) {
  const cmd = `cargo new ${name} --lib`;
  console.log('cmd: ', cmd);
  const result = spawnSync(cmd);
  if (result) {
    const { stdout, stderr } = result;
    if (stderr) {
      console.log(stderr.toString());
    }
    console.log(stdout.toString());
  }
}

function main() {
  const name = process.argv[2];
  if (!name) {
    console.log('Please run `pnpm new:space $name`');
    process.exit(1);
  }
  createCargoLib(name);
}

main();
