import { DocSchedules, Prisma } from '@prisma/client';

import prisma from '../../prisma';
import { CreateShedules } from '../models/models';

export default class ScheduleService {
  static async getSchedule(slotId: number) {
    const scheduleSlot = await prisma.docSchedules.findUnique({
      where: { id: slotId },
      include: {
        pet: true,
      },
    });
    return scheduleSlot;
  }

  static async getAllSchedules(docId: number, dateOfReceipt: Date) {
    const startOfYear = new Date(dateOfReceipt.getFullYear(), 0, 1);
    const schedules = await prisma.docSchedules.findMany({
      where: {
        docId,
        dateOfReceipt: {
          gte: startOfYear,
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

  static async deleteScheduleSlot(slotId: number) {
    await prisma.docSchedules.delete({ where: { id: slotId } });
  }

  static async updateVisit(slotId: number, slotItem: DocSchedules) {
    const { docId, ...restSlotData } = slotItem;
    await prisma.docSchedules.update({ where: { id: slotId }, data: restSlotData });
  }
}
