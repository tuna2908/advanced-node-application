// import cluster from 'cluster';
// import express from "express";
// import { doHash } from './utils';

// process.env.UV_THREADPOOL_SIZE = '1';   //set threadpool total in each node process to 1 for more precise benmarking
// const NUMBER_OF_CHILD_CLUSTER = 6;

// if (cluster.isPrimary) {
//   [...new Array(NUMBER_OF_CHILD_CLUSTER)].forEach((_, index) => {
//     cluster.fork();
//   })
// }
// else {
//   const app = express();
//   const port = 8080;

//   app.get("/", (req, res) => {
//     // slowDownFunction(5000);   //slowdown 5s
//     doHash();
//     res.send("this was slow");
//   });

//   app.get("/fast", (req, res) => {
//     res.send("this was fast");
//   });

//   app.listen(port, () => {
//     console.log(`node-advanced-knownledge listening at http://localhost:${port}`);
//   });
// }

