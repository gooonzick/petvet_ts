import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
type Token = { userId: number, userGroup: number }

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) return res.status(401).json({ errorMessage: 'Вы не авторизованный для этой операции' });
  try {
    const token: string = req.headers.authorization.split(' ')[1];
    const { userId, userGroup } = jwt.verify(
      token,
      String(process.env.TOKEN_SECRET).toString(),
    ) as Token;
    res.locals.userId = userId;
    res.locals.userGroup = userGroup;
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ errorMessage: error.message });
    }
    return res.status(500).json({ errorMessage: 'Ошибка сервера' });
  }
  return next();
};

export default isAuth;
