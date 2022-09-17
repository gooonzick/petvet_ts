import prisma from '../../prisma';
import { IPetForm } from '../models/models';

class PetService {
  static async getAllPets(ownerId: number) {
    const allPets = await prisma.pet.findMany({
      where: {
        ownerId,
      },
      select: {
        id: true,
        img: true,
        name: true,
      },
    });
    return allPets;
  }

  static async getOnePet(id: string) {
    const pet = await prisma.pet.findUnique({
      where: { id: Number.parseInt(id, 10) },
      include: {
        chronicDiseases: true,
        allergies: true,
        vaccinations: true,
        Visit: true,
      },
    });
    return pet;
  }

  static async addPet(petForm: IPetForm, ownerId: number) {
    const newPetInfo = await prisma.pet.create({
      data: {
        name: petForm.name,
        specie: petForm.specie,
        breed: petForm.breed,
        sex: petForm.sex,
        birthday: new Date(petForm.birthday),
        weight: Number.parseInt(petForm.weight, 10),
        color: petForm.color,
        sterilized: petForm.sterilized,
        sterilizedDate: new Date(petForm.sterilizedDate),
        ownerId,
      },
    });
    const promiseArray = [];
    if (petForm.allergies.length > 0) {
      promiseArray.push(prisma.allergy.createMany({
        data: petForm.allergies.map((a) => ({
          petId: newPetInfo.id,
          name: a.toString(),
        })),
      }));
    }
    if (petForm.chronicDiseases.length > 0) {
      promiseArray.push(
        prisma.chronicDiseases.createMany({
          data: petForm.chronicDiseases.map((cd) => ({
            petId: newPetInfo.id,
            name: cd.toString(),
          })),
        }),
      );
    }
    if (petForm.vaccinations.length > 0) {
      promiseArray.push(
        prisma.vaccination.createMany({
          data: petForm.vaccinations.map((v) => ({
            petId: newPetInfo.id,
            description: v.description,
            drugName: v.drugName,
            drugDate: new Date(v.drugDate),
          })),
        }),
      );
    }
    await Promise.all(promiseArray);
  }
}

export default PetService;
