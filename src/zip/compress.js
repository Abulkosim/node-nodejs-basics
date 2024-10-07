const fs = require('fs');
const zlib = require('zlib');
const { pipeline } = require('stream');
const { promisify } = require('util');
const path = require('path');

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