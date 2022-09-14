import prisma from '../../prisma';

class DocService {
  static async getAllDocs(profileId: string, categoryId: string, userName: string) {
    const queryFilter = {
      category: {},
      profile: {},
      user: {},
    };

    if (profileId) Object.assign(queryFilter.profile, { profileId: Number(profileId) });
    if (categoryId) Object.assign(queryFilter.category, { categoryId: Number(categoryId) });
    if (userName) {
      queryFilter.user = {
        name: {
          contains: userName,
          mode: 'insensitive',
        },
      };
    }

    const allDocs = await prisma.user.findMany({
      where: {
        userGroupId: 1,
        ...queryFilter.user,
        categories: { some: queryFilter.category },
        profiles: { some: queryFilter.profile },
      },
      include: {
        docInfo: true,
      },
    });
    return allDocs;
  }

  static async getOneDoc(id: string) {
    const oneDoc = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        docInfo: true,
        docSchedules: true,
        priceList: {
          select: {
            id: true,
            price: true,
            service: true,
          },
        },
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
    });
    return oneDoc;
  }

  static async updateExperience(text: string, docId: number) {
    await prisma.docInfo.update({
      where: { docId },
      data: {
        experience: text,
      },
    });
  }

  static async addNewCategory(categoryId: number, docId: number) {
    await prisma.categoryOnUser.create({
      data: {
        categoryId,
        docId,
      },
    });
  }

  static async deleteCategory(categoryId: number, docId: number) {
    await prisma.categoryOnUser.delete({
      where: {
        docId_categoryId: {
          docId,
          categoryId,
        },
      },
    });
  }

  static async addNewProfile(profileId: number, docId: number) {
    await prisma.profileOnUser.create({
      data: {
        profileId,
        docId,
      },
    });
  }

  static async deleteProfile(profileId: number, docId: number) {
    await prisma.profileOnUser.delete({
      where: {
        docId_profileId: {
          docId,
          profileId,
        },
      },
    });
  }

  static async addPriceList(priceListEntry: {price: number, service: string}, docId: number) {
    const { price, service } = priceListEntry;
    await prisma.priceList.create({
      data: {
        docId,
        price,
        service,
      },
    });
  }

  static async deletePriceList(id: number) {
    await prisma.priceList.delete({
      where: {
        id,
      },
    });
  }
}

export default DocService;
