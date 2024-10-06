const fs = require('node:fs/promises');
const path = require('path');

const read = async () => {
    const sourcePath = path.join(__dirname, 'files', 'fileToRead.txt');

    try {
        const fileExists = await fs.access(sourcePath).then(() => true).catch(() => false);
        if (!fileExists) {
            throw new Error('FS operation failed');
        }
        
        const contentToBeRead = await fs.readFile(sourcePath, { encoding: 'utf8' });
        console.log(contentToBeRead)
    } catch (error) {
        throw error;
    }
};

read();