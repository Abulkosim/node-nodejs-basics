import { promises as fs } from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const create = async () => {
  const filePath = path.join(__dirname, 'files', 'fresh.txt');
  const content = 'I am fresh and young';

  try {
    await fs.writeFile(filePath, content, { flag: 'wx' });
    console.log('File created successfully');
  } catch (error) {
    if (error.code === 'EEXIST') {
      throw new Error('FS operation failed');
    }
    throw error;
  }
};

create();