import express from 'express';
import healthRouter from './routes/health';
import userRouter from './routes/user.route';
import cors from 'cors';
import { connectDB } from './config/db';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
// default to 3000 when PORT is not set
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(express.json());
// Configure CORS to allow requests from your Next.js client and allow credentials (cookies)
const clientOrigin = process.env.CLIENT_URL ?? 'http://localhost:3001';
app.use(
  cors({
    origin: clientOrigin,
    credentials: true,
  })
);
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
