import { NextApiResponse, NextApiRequest } from 'next';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = fileURLToPath(import.meta.url);
const jsonFile = path.resolve(__dirname, '../../../package.json');

async function handleRequest(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const pkg = await readFile(jsonFile, 'utf-8');
    res.status(200).send(pkg);
  } catch (error) {
    res.status(200).json({ error: error });
  }
}

export default handleRequest;
