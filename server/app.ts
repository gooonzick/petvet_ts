import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './src/routes/auth.route';
import petRouter from './src/routes/pet.route';
import docRouter from './src/routes/doc.route';
import categoryRouter from './src/routes/category.route';
import profileRouter from './src/routes/profile.route';
import userRouter from './src/routes/user.route';

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
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/profiles', profileRouter);
app.use('/api/v1/users', userRouter);

app.listen(PORT, () => {
  console.log(`⚡️ Server started at port ${PORT}`);
});
