import path from 'path';
import { fileURLToPath } from 'url';

const current = path.dirname(fileURLToPath(import.meta.url));
export const ROOT_PATH = path.resolve(current, '../');
export function joinPath(...args) {
  return path.join(ROOT_PATH, ...args);
}
