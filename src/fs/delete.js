const fs = require('node:fs/promises');
const path = require('path');

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