import cluster from 'cluster';
import express from "express";

const NUMBER_OF_CHILD_CLUSTER = 4;

const slowDownFunction = (duration: number) => {
  const start = Date.now();
  while (Date.now() - start < duration) { }
}


if (cluster.isPrimary) {
  [...new Array(NUMBER_OF_CHILD_CLUSTER)].forEach((_, index) => {
    cluster.fork();
  })
}
else {
  const app = express();
  const port = 8080;

  app.get("/", (req, res) => {
    slowDownFunction(5000);   //slowdown 5s
    res.send("this was slow");
  });

  app.get("/fast", (req, res) => {
    res.send("this was fast");
  });

  app.listen(port, () => {
    console.log(`node-advanced-knownledge listening at http://localhost:${port}`);
  });
}

