import { Request, Response } from 'express';
import {
  IPetForm, isAuth,
} from '../models/models';
import PetService from '../services/pet.service';

export default class PetController {
  static async getAllPets(req: Request, res: Response<any, isAuth>) {
    const { userId } = res.locals;
    try {
      const allPets = await PetService.getAllPets(userId);
      return res.status(200).json(allPets);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  static async getOnePet(req: Request<{id: string}>, res: Response) {
    const { id } = req.params;
    try {
      const pet = await PetService.getOnePet(id);
      return res.status(200).json(pet);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  static async addPet(req: Request<any, any, IPetForm>, res: Response) {
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
  }
}
