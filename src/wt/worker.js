const { parentPort } = require('worker_threads');

const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = (result) => {
    parentPort.postMessage(result);
};

parentPort.on('message', (n) => {
    try {
        console.log(`Worker received: ${n}`);
        const result = nthFibonacci(n);
        sendResult(result);
    } catch (error) {
        parentPort.postMessage({ error: error.message });
    }
});