import path from 'path';
import { fileURLToPath } from 'url';

const current = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(current, '../');
