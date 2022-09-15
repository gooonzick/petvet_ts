import prisma from '../../prisma';

export default class UserService {
  static async getUser(id: number) {
    const user = await prisma.user.findUnique(
      {
        where: { id },
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
    return user;
  }

  static async updateFullName(newName: string, userId: number) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: newName,
      },
    });
  }

  static async updatePhone(newPhone: string, userId: number) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        phone: newPhone,
      },
    });
  }

  static async updateEmail(newEmail: string, userId: number) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email: newEmail,
      },
    });
  }
}
