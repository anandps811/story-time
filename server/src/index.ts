import express from 'express';
import healthRouter from './routes/health';
import userRouter from './routes/user.route';
import { connectDB } from './config/db';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
// default to 3000 when PORT is not set
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(express.json());
app.use('/health', healthRouter);
app.use('/user', userRouter);


app.get('/', (req, res) => res.json({ message: 'Story Time server running' }));

const start = async () => {
  // ensure DB is connected before starting the HTTP server
  await connectDB();

  if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }
};

start().catch(err => {
  console.error('Failed to start server:', err);
});

export default app;
