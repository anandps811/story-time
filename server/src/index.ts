import express from 'express';
import healthRouter from './routes/health';


import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(express.json());
app.use('/health', healthRouter);


app.get('/', (req, res) => res.json({ message: 'Story Time server running' }));

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

export default app;
