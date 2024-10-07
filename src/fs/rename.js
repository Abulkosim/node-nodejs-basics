import { promises as fs } from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rename = async () => {
    const sourcePath = path.join(__dirname, 'files', 'wrongFilename.txt');
    const renamePath = path.join(__dirname, 'files', 'properFilename.md');

    try {
        const fileExists = await fs.access(sourcePath).then(() => true).catch(() => false);
        if (!fileExists) {
            throw new Error('FS operation failed');
        }
        await fs.rename(sourcePath, renamePath);
        console.log('File renamed successfully');
    } catch (error) {
        throw error;
    }
};

rename();