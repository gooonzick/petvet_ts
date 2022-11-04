import express, { Router } from 'express';
import ScheduleController from '../controllers/schedule.controller';
import isAuth from '../middlewares/isAuth';

const router: Router = express.Router();

router.get('/', isAuth, ScheduleController.getAllSchedules);

export default router;
