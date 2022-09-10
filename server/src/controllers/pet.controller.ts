import { Request, Response } from 'express';
import {
  CustomRequest, CustomResponse, IPetForm, isAuth,
} from '../models/models';
import PetService from '../services/pet.service';

export const getAllPets = async (req: Request, res: CustomResponse<isAuth>) => {
  try {
    const allPets = await PetService.getAllPets(res.locals.userId);
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
    const pet = await PetService.getOnePet(id);
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
    await PetService.addPet(petForm, ownerId);
    return res.sendStatus(200);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};
