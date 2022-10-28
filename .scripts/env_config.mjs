import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const __projectRoot = path.resolve(__dirname, '..');
export const join_path = (...p) => path.join(__projectRoot, ...p);
export const swc_config = JSON.parse(fs.readFileSync(join_path('.scripts/swcrc.json'), 'utf-8'));
