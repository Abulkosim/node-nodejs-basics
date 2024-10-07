import { promises as fs } from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const remove = async () => {
    const sourcePath = path.join(__dirname, 'files', 'fileToRemove.txt');

    try {
        const fileExists = await fs.access(sourcePath).then(() => true).catch(() => false);
        if (!fileExists) {
            throw new Error('FS operation failed');
        }
        await fs.unlink(sourcePath);
        console.log('File deleted successfully');
    } catch (error) {
        throw error;
    }
};

remove();