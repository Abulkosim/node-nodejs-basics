import { Transform } from 'stream';

const transform = async () => {
    const reverseTransform = new Transform({
        transform(chunk, encoding, callback) {
            const reversed = chunk.toString().split('').reverse().join('');
            this.push(reversed);
            callback();
        }
    });

    console.log('Enter text to reverse. Press Ctrl+D (Unix) or Ctrl+Z (Windows) to finish:');

    process.stdin.setEncoding('utf8');

    process.stdin
        .pipe(reverseTransform)
        .pipe(process.stdout);

    return new Promise((resolve) => {
        process.stdin.on('end', () => {
            console.log('\nTransformation complete.');
            resolve();
        });
    });
};

transform().catch(error => console.error('Transform operation failed:', error));