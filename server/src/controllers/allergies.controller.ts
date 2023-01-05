import { Request, Response } from 'express';

import AllergyService from '../services/allergy.service';
import PetService from '../services/pet.service';

import { AuthLocals } from '../models/models';

export default class AllergyController {
  static async createNewAllergy(
    req: Request<any, any, any, {name: string, petId: string}>,
    res: Response<any, AuthLocals>,
  ) {
    const { name, petId } = req.body;
    const { userId } = res.locals;

    try {
      const pet = await PetService.getOnePet(petId);

      if (pet?.ownerId !== userId) {
        return res.status(401).json({ error: 'Вы не можете удалять чужие записи', result: null });
      }

      const allDocs = await AllergyService.createNewAllergy(name, petId);
      return res.status(200).json(allDocs);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}
