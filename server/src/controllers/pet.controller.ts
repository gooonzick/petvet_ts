import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import {
  CustomRequest, CustomResponse, IPetForm, isAuth,
} from '../models/models';

const prisma = new PrismaClient();
export const getAllPets = async (req: Request, res: CustomResponse<isAuth>) => {
  try {
    const allPets = await prisma.pet.findMany({
      where: {
        ownerId: res.locals.userId,
      },
      select: {
        id: true,
        img: true,
        name: true,
      },
    });
    return res.status(200).json(allPets);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};
export const getOnePet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pet = await prisma.pet.findMany({ where: { id: Number.parseInt(id, 10) } });
    return res.status(200).json(pet);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};

export const addPet = async (req: CustomRequest<IPetForm>, res: Response) => {
  const petForm = req.body;
  const ownerId = res.locals.userId;
  try {
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
      for (let i = 0; i < petForm.allergies.length; i += 1) {
        promiseArray.push(
          prisma.allergy.create({
            data: {
              petId: newPetInfo.id,
              name: petForm.allergies[i].toString(),
            },
          }),
        );
      }
    }
    if (petForm.chronicDiseases.length > 0) {
      for (let i = 0; i < petForm.chronicDiseases.length; i += 1) {
        promiseArray.push(
          prisma.chronicDiseases.create({
            data: {
              petId: newPetInfo.id,
              name: petForm.chronicDiseases[i].toString(),
            },
          }),
        );
      }
    }
    if (petForm.vaccinations.length > 0) {
      for (let i = 0; i < petForm.vaccinations.length; i += 1) {
        promiseArray.push(
          prisma.vaccination.create({
            data: {
              petId: newPetInfo.id,
              description: petForm.vaccinations[i].description,
              drugName: petForm.vaccinations[i].drugName,
              drugDate: new Date(petForm.vaccinations[i].drugDate),
            },
          }),
        );
      }
    }
    await Promise.all(promiseArray);
    return res.sendStatus(200);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};
