import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import TokenService from '../services/token.serivce';

dotenv.config();

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) return res.status(401).json({ errorMessage: 'Вы не авторизованный для этой операции' });
  try {
    const token: string = req.headers.authorization.split(' ')[1];
    const tokenInfo = TokenService.verifyToken(token);
    if (!tokenInfo) return res.status(401).json({ errorMessage: 'Токен истек' });
    const { userId, userGroup } = tokenInfo;
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
