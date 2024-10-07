import { cpus } from 'os';
import { Worker } from 'worker_threads';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createWorkers() {
    const numCores = cpus().length;
    const workers = [];
    const results = new Array(numCores);

    for (let i = 0; i < numCores; i++) {
        const worker = new Worker(path.resolve(__dirname, './worker.js'));
        workers.push(worker);

        worker.postMessage(10 + i);

        worker.on('message', (message) => {
            results[i] = message;
            checkIfAllWorkersFinished();
        });

        worker.on('error', (err) => {
            console.error(err);
            results[i] = { status: 'error', data: null };
            checkIfAllWorkersFinished();
        });
    }

    function checkIfAllWorkersFinished() {
        if (results.filter(result => result !== undefined).length === numCores) {
            console.log(results);
        }
    }
}

createWorkers();