import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
type Token = { userId: number, userGroup: number }

export default class TokenService {
  static createToken(user: User) {
    const token = jwt.sign(
      { userId: user.id, userGroup: user.userGroupId },
      String(process.env.TOKEN_SECRET).toString(),
      { expiresIn: '14d' },
    );
    return token;
  }

  static verifyToken(token: string) {
    try {
      const user = jwt.verify(
        token,
        String(process.env.TOKEN_SECRET).toString(),
      ) as Token;
      return user;
    } catch (error) {
      return undefined;
    }
  }
}
