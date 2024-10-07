import { Worker } from 'worker_threads';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const performCalculations = async () => {
    const numCores = os.cpus().length;
    const workerPath = path.join(__dirname, 'worker.js');
    const workers = [];
    const results = [];

    for (let i = 0; i < numCores; i++) {
        const worker = new Worker(workerPath);
        workers.push(worker);

        worker.on('message', (result) => {
            if (result.error) {
                results[i] = { status: 'error', data: null };
            } else {
                results[i] = { status: 'resolved', data: result };
            }
        });

        worker.on('error', () => {
            results[i] = { status: 'error', data: null };
        });

        worker.postMessage(10 + i);
    }

    await Promise.all(workers.map(worker => new Promise(resolve => worker.on('exit', resolve))));
    console.log('Final results:', results);
};

performCalculations().catch(error => console.error('Error:', error));