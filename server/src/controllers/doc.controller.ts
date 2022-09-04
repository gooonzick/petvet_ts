import { Prisma, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getAllDocs = async (req: Request, res: Response) => {
  const { profileName, categoryName, userName } = req.query;

  const queryFilter = {
    category: {},
    profile: {},
    user: {},
  };

  if (profileName) Object.assign(queryFilter.profile, { name: profileName });
  if (categoryName) Object.assign(queryFilter.category, { name: categoryName });
  if (userName) {
    const query = `%${userName}%`;
    const sql = `
      SELECT id FROM "User" 
      WHERE "name" LIKE '${query}'
      AND "userGroupId" = 1;
    `;
    const ids = await prisma.$queryRaw<{ id: number }[]>(Prisma.raw(sql));
    Object.assign(queryFilter.user, { id: { in: ids.map((el) => el.id) } });
  }

  try {
    const allDocs = await prisma.user.findMany({
      where: {
        userGroupId: 1,
        ...queryFilter.user,
      },
      include: {
        docInfo: true,
      },
    });
    return res.status(200).json(allDocs);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};

export const getOneDoc = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const oneDoc = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        docInfo: true,
        docSchedules: true,
      },
    });
    return res.status(200).json(oneDoc);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};