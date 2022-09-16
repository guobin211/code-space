import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT_PATH = path.resolve(__dirname, '../');
export function joinPath(...args) {
  return path.join(ROOT_PATH, ...args);
}
