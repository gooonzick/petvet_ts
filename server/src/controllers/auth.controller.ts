import { Response } from 'express';
import {
  User,
} from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CustomRequest, SignUpForm } from '../models/models';
import prisma from '../../prisma';

const removePass = (user: User): any => {
  const {
    password, createdAt, updatedAt, ...other
  } = user;
  return other;
};

export const signUp = async (req: CustomRequest<SignUpForm>, res: Response) => {
  const {
    email, password, username, phone, userGroupId,
  } = req.body;

  if (!email || !password || !username || !phone || !userGroupId) return res.status(400).json({ message: 'Заполните все поля' });
  try {
    const ifExist = await prisma.user.findUnique({ where: { email } });
    if (ifExist) return res.status(400).json({ message: 'Пользователь с такой почтой существует' });
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create(
      {
        data: {
          email, password: hashedPass, name: username, phone, userGroupId,
        },
      },
    );
    const token = jwt.sign(
      { userId: newUser.id, userGroup: newUser.userGroupId },
      String(process.env.TOKEN_SECRET).toString(),
      { expiresIn: '14d' },
    );
    return res.json({ token, user: removePass(newUser) });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};

export const signIn = async (req: CustomRequest<SignUpForm>, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Заполните все поля' });
  try {
    const currentUser = await prisma.user.findUnique(
      {
        where: { email },
        include: {
          pets: true,
          docInfo: {
            select: {
              experience: true,
              clinicAddress: true,
            },
          },
          categories: true,
          profiles: true,
          priceList: true,
        },
      },
    );
    if (!currentUser) return res.status(400).json({ message: 'Пользователь не найден' });
    const checkPass = await bcrypt.compare(password, currentUser.password);
    if (!checkPass) return res.status(400).json({ message: 'Пароль неверный' });
    const token = jwt.sign(
      { userId: currentUser.id, userGroup: currentUser.userGroupId },
      String(process.env.TOKEN_SECRET).toString(),
      { expiresIn: '14d' },
    );

    return res.json({ token, user: removePass(currentUser) });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};
