import prisma from '../../prisma';

export default class AllergyService {
  static async createNewAllergy(name: string, petId: string) {
    await prisma.allergy.create({ data: { name, petId: Number(petId) } });
  }
}
