import { Response, Request } from 'express';
import {
  User,
} from '@prisma/client';
import { SignInForm, SignUpForm } from '../models/models';
import AuthService from '../services/auth.service';
import TokenService from '../services/token.serivce';
import UserService from '../services/user.service';

const removePass = (user: User): any => {
  const {
    password, createdAt, updatedAt, ...other
  } = user;
  return other;
};

export default class AuthController {
  static async signUp(req: Request<any, any, SignUpForm>, res: Response) {
    const [form, isValid] = AuthService.validateForm(req.body, 'signup');
    if (!isValid) return res.status(400).json({ message: 'Заполните все поля' });
    const {
      email, password, username, phone, userGroupId,
    } = form as SignUpForm;
    try {
      const [newUser, isCreated] = await AuthService
        .signUp(email, password, username, phone, userGroupId);
      if (!isCreated) return res.status(400).json({ message: 'Пользователь с такой почтой существует' });
      const token = TokenService.createToken(newUser);
      return res.json({ token, user: removePass(newUser) });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  static async signIn(req: Request<any, any, SignUpForm>, res: Response) {
    const [form, isValid] = AuthService.validateForm(req.body, 'signin');
    if (!isValid) return res.status(400).json({ message: 'Заполните все поля' });
    const {
      email, password,
    } = form as SignInForm;
    try {
      const [currentUser, checkPass] = await AuthService.signIn(email, password);
      if (!currentUser) return res.status(400).json({ message: 'Пользователь не найден' });
      if (!checkPass) return res.status(400).json({ message: 'Пароль неверный' });
      const token = TokenService.createToken(currentUser);

      return res.json({ token, user: removePass(currentUser) });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  static async isAuth(req: Request, res: Response) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ errorMessage: 'Вы не авторизованный' });
    const tokenInfo = TokenService.verifyToken(token);
    if (!tokenInfo) return res.status(401).json({ errorMessage: 'Токен истек' });
    try {
      const user = await UserService.getUser(tokenInfo.userId);
      if (!user) return res.status(500).json({ errorMessage: 'Пользователь не найден' });
      return res.json({ user, token: TokenService.createToken(user) });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}
