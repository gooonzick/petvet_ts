import { Prisma } from '@prisma/client';

import prisma from '../../prisma';
import { CreateShedules } from '../models/models';

export default class ScheduleService {
  static async getAllSchedules(docId: number, dateOfReceipt: Date) {
    const schedules = await prisma.docSchedules.findMany({
      where: {
        docId,
        dateOfReceipt: {
          gte: dateOfReceipt,
        },
      },
      select: {
        id: true,
        dateOfReceipt: true,
        pet: {
          select: {
            id: true,
            name: true,
            specie: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            phone: true,
          },
        },
        isClose: true,
      },
      orderBy: {
        dateOfReceipt: 'asc',
      },
    });
    return schedules;
  }

  static async createNewScheduleSlots(docId: number, dates: CreateShedules[]) {
    const schedulesToCreate: Prisma.DocSchedulesCreateManyInput[] = dates
      .map(({ dateOfReceipt }) => ({
        dateOfReceipt,
        docId,
        isClose: false,
      }));

    await prisma.docSchedules.createMany({
      data: schedulesToCreate,
    });
  }

  static async deleteScheduleSlot(slotId: number, docId: number) {
    const scheduleSlot = await prisma.docSchedules.findUnique({ where: { id: slotId } });
    if (scheduleSlot?.docId !== docId) {
      return {
        success: false,
        error: { code: 401, message: 'Пользователь не авторизован' },
      };
    }
    await prisma.docSchedules.delete({ where: { id: slotId } });
    return { success: true, error: null };
  }
}
