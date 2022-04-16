import { spawnSync } from 'child_process';

function createCargoLib(name) {
  const cmd = `cargo new --name ${name} --lib packages/${name}`;
  const result = spawnSync(cmd);
  console.log('cmd: ', cmd);
  if (result) {
    const { stdout, stderr } = result;
    if (stderr) {
      console.log(stderr.toString());
    }
    if (stdout) {
      console.log(stdout.toString());
    }
  }
}

function main() {
  const name = process.argv[2];
  if (!name) {
    console.log('Please run `npm new:space $name`');
    process.exit(1);
  }
  createCargoLib(name);
}

main();
