import { Request, Response } from 'express';
import { IDocFilterQuery } from '../models/models';
import DocService from '../services/doc.service';

export default class DocController {
  static async getAllDocs(req: Request<any, any, any, IDocFilterQuery>, res: Response) {
    const { profileId, categoryId, userName } = req.query;

    try {
      const allDocs = await DocService.getAllDocs(profileId, categoryId, userName);
      return res.status(200).json(allDocs);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  static async getOneDoc(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const oneDoc = await DocService.getOneDoc(id);
      return res.status(200).json(oneDoc);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  static async updateDocInfo(req: Request, res: Response) {
    const [key] = Object.keys(req.body);
    const value = req.body[key];
    const { userId } = res.locals;
    let updateData;
    try {
      switch (key) {
        case 'categoryId':
          await DocService.addNewCategory(Number(value), userId);
          updateData = await DocService.getOneDoc(userId);
          return res.json(updateData);
        case 'profileId':
          await DocService.addNewProfile(Number(value), userId);
          updateData = await DocService.getOneDoc(userId);
          return res.json(updateData);
        case 'priceList':
          await DocService.addPriceList({
            price: Number(value.price),
            service: value.service,
          }, userId);
          updateData = await DocService.getOneDoc(userId);
          return res.json(updateData);
        case 'experience':
          await DocService.updateExperience(value, userId);
          updateData = await DocService.getOneDoc(userId);
          return res.json(updateData);
        case 'clinicAddress':
          await DocService.updateClinicAddress(value, userId);
          updateData = await DocService.getOneDoc(userId);
          return res.json(updateData);
        default:
          return res.sendStatus(202);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  static async deleteDocInfo(req: Request, res: Response) {
    const [key] = Object.keys(req.body);
    const value = req.body[key];
    const { userId } = res.locals;
    let updateData;
    try {
      switch (key) {
        case 'categoryId':
          await DocService.deleteCategory(Number(value), userId);
          updateData = await DocService.getOneDoc(userId);
          return res.json(updateData);
        case 'profileId':
          await DocService.deleteProfile(Number(value), userId);
          updateData = await DocService.getOneDoc(userId);
          return res.json(updateData);
        case 'priceList':
          await DocService.deletePriceList(value);
          updateData = await DocService.getOneDoc(userId);
          return res.json(updateData);
        default:
          return res.sendStatus(202);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}
