const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const calculateHash = async () => {
    const filePath = path.join(__dirname, 'files/fileToCalculateHashFor.txt');
    const hash = crypto.createHash('sha256');

    try {
        const stream = fs.createReadStream(filePath);

        for await (const chunk of stream) {
            hash.update(chunk);
        }

        const fileHash = hash.digest('hex');
        console.log(`SHA256 hash for file: \n${fileHash}`);
    } catch (error) {
        console.error(error);
    }
};

calculateHash();