/* eslint-disable import/prefer-default-export */
import { DocSchedules } from '@prisma/client';
import { Response, Request } from 'express';
import { AuthLocals, CreateShedules } from '../models/models';
import ScheduleService from '../services/schedule.service';

export default class ScheduleController {
  static async getAllSchedules(
    req: Request<{}, any, any, { date: string }>,
    res: Response<any, AuthLocals>,
  ) {
    const { userId } = res.locals;
    const { date } = req.query;
    try {
      const schedules = await ScheduleService.getAllSchedules(userId, new Date(date));
      return res.json(schedules);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  static async createNewScheduleSlots(
    req: Request<{}, any, CreateShedules[], any>,
    res: Response<any, AuthLocals>,
  ) {
    const { userId } = res.locals;
    try {
      await ScheduleService.createNewScheduleSlots(userId, req.body);
      return res.sendStatus(200);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  static async deleteScheduleSlot(
    req: Request<{id: string}>,
    res: Response<any, AuthLocals>,
  ) {
    const { userId } = res.locals;
    const { id } = req.params;
    try {
      const { success, error } = await ScheduleService.deleteScheduleSlot(Number(id), userId);
      if (success) return res.sendStatus(200);
      if (error) return res.status(error.code).json({ message: error.message });
      throw Error();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  static async updateVisit(
    req: Request<{id: string}, DocSchedules>,
    res: Response<any, AuthLocals>,
  ) {
    const { userId } = res.locals;
    const { id } = req.params;
    try {
      const { success, error } = await ScheduleService.updateVisit(Number(id), userId, req.body);
      if (success) return res.sendStatus(200);
      if (error) return res.status(error.code).json({ message: error.message });
      throw Error();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}
