import { NextFunction, Request, Response } from 'express';
import prisma from '../../prisma';

const isAuthPriceList = async (req: Request, res: Response, next: NextFunction) => {
  const [key] = Object.keys(req.body);
  if (key !== 'pirceList') return next();
  const priceListEntry = await prisma.priceList.findUnique({
    where: {
      id: Number(req.body[key]),
    },
  });
  if (priceListEntry?.docId !== res.locals.userId) return res.status(401).json({ errorMessage: 'Вы не авторизованный для этой операции' });
  return next();
};

export default isAuthPriceList;
