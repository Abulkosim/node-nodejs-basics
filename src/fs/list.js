const fs = require('node:fs/promises');
const path = require('path');

const list = async () => {
    const sourcePath = path.join(__dirname, 'files');

    try {
        const folderExists = await fs.access(sourcePath).then(() => true).catch(() => false);
        if (!folderExists) {
            throw new Error('FS operation failed');
        }
        
        const files = await fs.readdir(sourcePath);

        for (let file of files) {
            console.log(JSON.stringify(file))
        }
    } catch (error) {
        throw error;
    }
};

list();