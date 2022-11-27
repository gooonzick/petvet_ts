import express, { Router } from 'express';
import ScheduleController from '../controllers/schedule.controller';
import isAuth from '../middlewares/isAuth';

const router: Router = express.Router();

router.get('/', isAuth, ScheduleController.getAllSchedules);
router.post('/', isAuth, ScheduleController.createNewScheduleSlots);
router.delete('/:id', isAuth, ScheduleController.deleteScheduleSlot);

export default router;
