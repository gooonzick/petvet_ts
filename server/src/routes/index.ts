import express, { Router } from 'express';

import authRouter from './auth.route';
import petRouter from './pet.route';
import docRouter from './doc.route';
import categoryRouter from './category.route';
import profileRouter from './profile.route';
import userRouter from './user.route';
import scheduleRouter from './schedule.route';

const router: Router = express.Router();

router.use('/api/v1/auth', authRouter);
router.use('/api/v1/pets', petRouter);
router.use('/api/v1/docs', docRouter);
router.use('/api/v1/categories', categoryRouter);
router.use('/api/v1/profiles', profileRouter);
router.use('/api/v1/users', userRouter);
router.use('/api/v1/schedules', scheduleRouter);

export default router;
