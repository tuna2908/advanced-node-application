import cluster from 'cluster';
import express from "express";
import { doHash } from './utils';


const app = express();
const port = 8080;

app.get("/", (req, res) => {
  // slowDownFunction(5000);   //slowdown 5s
  doHash();
  res.send("this was slow");
});

app.get("/fast", (req, res) => {
  res.send("this was fast");
});

app.listen(port, () => {
  console.log(`node-advanced-knownledge listening at http://localhost:${port}`);
});

