import { Request, Response } from 'express';
import prisma from '../../prisma';

// eslint-disable-next-line import/prefer-default-export
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const allCategories = await prisma.category.findMany();
    return res.json(allCategories);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};
