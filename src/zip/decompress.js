const fs = require('fs');
const zlib = require('zlib');
const { pipeline } = require('stream/promises');
const path = require('path');

const decompress = async () => {
    try {
        const readStream = fs.createReadStream(path.join(__dirname, 'files', 'archive.gz'));
        const writeStream = fs.createWriteStream(path.join(__dirname, 'files', 'fileToCompress.txt'));
        const gunzip = zlib.createGunzip();

        await pipeline(readStream, gunzip, writeStream);

        console.log('File decompressed successfully');
    } catch (error) {
        console.error('An error occurred during decompression:', error);
    }
};

decompress().catch(error => console.error('Decompression operation failed:', error));