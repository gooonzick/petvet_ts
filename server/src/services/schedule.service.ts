import prisma from '../../prisma';

export default class ScheduleService {
  static async getAllSchedules(docId: number, dateOfReceipt: Date) {
    const schedules = await prisma.docSchedules.findMany({
      where: { docId, dateOfReceipt },
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
      },
      orderBy: {
        dateOfReceipt: 'asc',
      },
    });
    return schedules;
  }
}
