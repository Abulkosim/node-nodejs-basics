const fs = require('node:fs/promises');
const path = require('path');

const create = async () => {
  const filePath = path.join(__dirname, 'files', 'fresh.txt');
  const content = 'I am fresh and young';

  try {
    await fs.writeFile(filePath, content, { flag: 'wx' });
    console.log('File created successfully');
  } catch (error) {
    if (error.code === 'EEXIST') {
      throw new Error('FS operation failed');
    }
    throw error;
  }
};

create();