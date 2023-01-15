import express from "express";
import { Config } from './config';

const app = express();
const PORT = process.env.PORT || 8080;

(async () => {
  try {
    const server = await Config.init(app);
    server.listen(PORT, () => {
      console.info(`Server running on ${PORT}`);
    });
  } catch (error) {
    console.error(`Server running on ${PORT}`);
  }
})();