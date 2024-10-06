const fs = require('node:fs/promises');
const path = require('path');

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