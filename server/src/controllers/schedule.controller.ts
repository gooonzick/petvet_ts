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
      const schedule = await ScheduleService.getSchedule(Number(id));
      if (!schedule) {
        return res.status(404).json({ error: 'Запись не найдена', result: null });
      }
      if (schedule.docId !== userId) {
        return res.status(403).json({ error: 'Вы не можете удалять чужие записи', result: null });
      }

      await ScheduleService.deleteScheduleSlot(Number(id));
      return res.status(200).json({ error: null, result: null });
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
      const schedule = await ScheduleService.getSchedule(Number(id));

      if (!schedule) {
        return res.status(404).json({ error: 'Запись не найдена', result: null });
      }

      if (schedule.docId !== userId || schedule.userId !== userId) {
        return res.status(403).json({ error: 'Вы не можете изменять чужие записи', result: null });
      }

      if (schedule.userId === userId && schedule.pet?.ownerId !== userId) {
        return res.status(403).json({ error: 'Вы не можете изменять чужие записи', result: null });
      }

      await ScheduleService.updateVisit(Number(id), userId, req.body);

      return res.status(201).json({ error: null, result: null });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}
