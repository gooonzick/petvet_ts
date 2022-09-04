import { Request, Response } from 'express';
import prisma from '../../prisma';

// eslint-disable-next-line import/prefer-default-export
export const getAllProfiles = async (req: Request, res: Response) => {
  try {
    const allProfiles = await prisma.profile.findMany();
    return res.json(allProfiles);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};
