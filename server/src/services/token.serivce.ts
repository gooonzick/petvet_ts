import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default class TokenService {
  static createToken(user: User) {
    const token = jwt.sign(
      { userId: user.id, userGroup: user.userGroupId },
      String(process.env.TOKEN_SECRET).toString(),
      { expiresIn: '14d' },
    );
    return token;
  }
}
