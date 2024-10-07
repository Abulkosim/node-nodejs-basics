const { spawn } = require('child_process');
const path = require('path');
const readline = require('readline');

const spawnChildProcess = async (args) => {
    const scriptPath = path.join(__dirname, 'files', 'script.js');
    const child = spawn('node', [scriptPath, ...args], {
        stdio: ['inherit', 'inherit', 'inherit', 'ipc']
    });

    child.on('error', (error) => {
        console.error(`Error: ${error.message}`);
    });

    return new Promise((resolve, reject) => {
        child.on('exit', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`Child process exited with code ${code}`));
            }
        });
    });
};

async function main() {
    try {
        console.log('Starting child process...');
        const childProcessPromise = spawnChildProcess(['arg1', 'arg2']);

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.on('line', (input) => {
            if (input.toLowerCase() === 'exit') {
                rl.close();
            }
        });

        await childProcessPromise;
        console.log('Child process completed successfully');
    } catch (error) {
        console.error('Error:', error.message);
    }
}

main();