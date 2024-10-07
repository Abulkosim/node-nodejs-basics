import { parentPort } from 'worker_threads';

function compute(number) {
    return number * 2;
}

parentPort.on('message', (data) => {
    try {
        const result = compute(data);
        parentPort.postMessage({ status: 'resolved', data: result });
    } catch (error) {
        parentPort.postMessage({ status: 'error', data: null });
    }
});