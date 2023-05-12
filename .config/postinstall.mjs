/* eslint-disable @typescript-eslint/naming-convention */
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

/**
 * @type {(arg: string) => Promise<{stdout: string, stderr: string}>}
 */
const execAsync = promisify(exec);

const __dirname = fileURLToPath(import.meta.url);
export const ROOT_PATH = path.resolve(__dirname, '..');

async function installCargo() {
  try {
    const resp = await execAsync('wasm-pack --version');
    if (resp.stdout?.includes('wasm-pack 0.10')) {
      console.log('wasm-pack is installed');
      return;
    }
    if (resp.stderr) {
      console.log('Installing cargo dependencies...');
      await execAsync('cargo install wasm-pack');
    }
  } catch (_) {
    console.log('Installing cargo dependencies...');
    await execAsync('cargo install wasm-pack');
  }
  console.log('cargo is installed');
}

installCargo();
