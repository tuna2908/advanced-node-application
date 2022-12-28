import express from "express";
const { Worker } = require('node:worker_threads');

const app = express();

app.get('/', (req, res) => {
  const worker = new Worker('./utils/worker.ts');

  worker.on('message', function (message: object) {
    console.log(message);
    res.send('' + message);
  });

  worker.postMessage('start!');
});

app.get('/fast', (req, res) => {
  res.send('This was fast!');
});

app.listen(8080);