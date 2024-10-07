const fs = require('fs');
const path = require('path');

const read = async () => {
    const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

    try {
        if (!fs.existsSync(filePath)) {
            throw new Error('File does not exist');
        }

        const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

        readStream.on('data', (chunk) => {
            console.log(chunk);
            process.stdout.write(chunk);
        });

        readStream.on('error', (error) => {
            console.error('Error reading file:', error.message);
        });

        await new Promise((resolve, reject) => {
            readStream.on('end', () => {
                resolve();
            });
            readStream.on('error', reject);
        });
    } catch (error) {
        console.error('Error:', error.message);
    }
};

read()