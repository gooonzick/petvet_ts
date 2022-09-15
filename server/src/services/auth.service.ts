import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import prisma from '../../prisma';
import { SignUpForm } from '../models/models';

export default class AuthService {
  static async signIn(email: string, password: string): Promise<[User | undefined, boolean]> {
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
          priceList: true,
          profiles: {
            select: {
              profile: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          categories: {
            select: {
              category: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      },
    );
    if (!currentUser) return [undefined, false];
    const checkPass = await bcrypt.compare(password, currentUser.password);
    if (!checkPass) return [currentUser, false];
    return [currentUser, true];
  }

  static async signUp(
    email: string,
    password: string,
    username: string,
    phone: string,
    userGroupId: number,
  ): Promise<[User, boolean]> {
    const currentUser = await prisma.user.findUnique({ where: { email } });
    if (currentUser) return [currentUser, false];
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create(
      {
        data: {
          email, password: hashedPass, name: username, phone, userGroupId,
        },
      },
    );
    return [newUser, true];
  }

  static validateForm(form: SignUpForm, type: 'signup' | 'signin'):[SignUpForm, boolean] {
    if (type === 'signup') {
      const {
        email, password, username, phone, userGroupId,
      } = form;
      if (!email || !password || !username || !phone || !userGroupId) return [form, false];
    } else {
      const { email, password } = form;
      if (!email || !password) return [form, false];
    }
    return [form, true];
  }
}
