import fs from 'fs';
import zlib from 'zlib';
import { pipeline } from 'stream';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compress = async () => {
    const pipelineAsync = promisify(pipeline);
    const filePath = path.join(__dirname, 'files', 'fileToCompress.txt');
    const archivePath = path.join(__dirname, 'files', 'archive.gz');
    const readStream = fs.createReadStream(filePath);
    const writeStream = fs.createWriteStream(archivePath);
    const gzip = zlib.createGzip();

    try {
        await pipelineAsync(
            readStream,
            gzip,
            writeStream
        );
        console.log('File compressed successfully');
    } catch (err) {
        console.error('An error occurred:', err);
        throw err;
    }
};

compress().catch(error => console.error('Compression operation failed:', error));