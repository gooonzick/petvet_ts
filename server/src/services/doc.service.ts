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
}

export default DocService;
