import express from 'express';
import { config } from './config/env.js';
import { initDB } from './models/index.js';
import { router } from './utils/routes.js';


const app = express();

app.use(express.json());

app.use(router);


app.listen(config.port, async () => {
    try {
      console.log(`server running on http://localhost:${config.port}`);
      await initDB();
    } catch (error) {
      console.error(`Error starting server`, error);
    }
});