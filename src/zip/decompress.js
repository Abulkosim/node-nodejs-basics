import fs from 'fs';
import zlib from 'zlib';
import { pipeline } from 'stream/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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