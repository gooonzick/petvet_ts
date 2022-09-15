/* eslint-disable import/prefer-default-export */
import { Response, Request } from 'express';
import UserService from '../services/user.service';

export default class UserController {
  static async updateUserInfo(req: Request, res: Response) {
    const [key] = Object.keys(req.body);
    const value = req.body[key];
    const { userId } = res.locals;
    let updateData;
    try {
      switch (key) {
        case 'email':
          await UserService.updateEmail(value, userId);
          updateData = await UserService.getUser(userId);
          return res.json(updateData);
        case 'phone':
          await UserService.updatePhone(value, userId);
          updateData = await UserService.getUser(userId);
          return res.json(updateData);
        case 'name':
          await UserService.updateFullName(value, userId);
          updateData = await UserService.getUser(userId);
          return res.json(updateData);
        default:
          return res.sendStatus(202);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}
