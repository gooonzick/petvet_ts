import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './src/routes/auth.route';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use('/api/v1/auth', authRouter);

app.listen(PORT, () => {
  console.log(`⚡️ Server started at port ${PORT}`);
});
