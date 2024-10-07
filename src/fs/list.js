import { promises as fs } from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const list = async () => {
    const sourcePath = path.join(__dirname, 'files');

    try {
        const folderExists = await fs.access(sourcePath).then(() => true).catch(() => false);
        if (!folderExists) {
            throw new Error('FS operation failed');
        }
        
        const files = await fs.readdir(sourcePath);

        for (let file of files) {
            console.log(JSON.stringify(file));
        }
    } catch (error) {
        throw error;
    }
};

list();