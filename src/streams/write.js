const fs = require('fs');
const path = require('path');

const write = async () => {
    const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');
    const writeStream = fs.createWriteStream(filePath);

    console.log('Enter text to write to the file (press Ctrl+D to finish):');

    process.stdin.setEncoding('utf8');

    process.stdin.on('data', (chunk) => {
        writeStream.write(chunk);
        console.log('Writing:', chunk.trim());
    });

    return new Promise((resolve, reject) => {
        process.stdin.on('end', () => {
            writeStream.end();
            console.log('Finished writing to the file.');
            resolve();
        });

        writeStream.on('error', (error) => {
            console.error('Error writing to file:', error.message);
            reject(error);
        });
    });
};

write().catch(error => console.error('Write operation failed:', error));