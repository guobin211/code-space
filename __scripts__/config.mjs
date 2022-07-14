import path from 'path';
import { fileURLToPath } from 'url';

const current = path.dirname(fileURLToPath(import.meta.url));
export const ROOT_PATH = path.resolve(current, '../');
export const DIST_PATH = path.join(ROOT_PATH, './.out');
export const WEB_APP_PATH = path.join(ROOT_PATH, 'app');
export const PUBLIC_PATH = path.join(WEB_APP_PATH, 'public');
