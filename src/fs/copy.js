import { promises as fs } from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copy = async () => {
    const sourcePath = path.join(__dirname, 'files');
    const copyPath = path.join(__dirname, 'files_copy');

    try {
        const dirExists = await fs.access(copyPath).then(() => true).catch(() => false);
        if (dirExists) {
            throw new Error('FS operation failed');
        }

        await fs.mkdir(copyPath, { recursive: true });
        let files = await fs.readdir(sourcePath);

        for (let file of files) {
            let srcPath = path.join(sourcePath, file);
            let cpPath = path.join(copyPath, file);
            await fs.copyFile(srcPath, cpPath);
        }

        console.log('Files copied successfully');
    } catch (error) {
        throw error;
    }
}

copy();
