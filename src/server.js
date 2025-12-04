import express from 'express';
import { config } from './config/env.js';
import { userRouter } from './users/users.routes.js';
import { initDB } from './models/index.js';


const app = express();

app.use(express.json());

app.use('/users', userRouter);


app.listen(config.port, async () => {
    try {
      console.log(`server running on http://localhost:${config.port}`);
      await initDB();
    } catch (error) {
      console.error(`Error starting server`, error);
    }
});