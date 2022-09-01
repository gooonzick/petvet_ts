import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './src/routes/auth.route';
import petRouter from './src/routes/pet.route';
import docRouter from './src/routes/doc.route';

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
app.use('/api/v1/pets', petRouter);
app.use('/api/v1/docs', docRouter);

app.listen(PORT, () => {
  console.log(`⚡️ Server started at port ${PORT}`);
});
