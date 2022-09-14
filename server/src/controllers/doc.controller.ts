import { Request, Response } from 'express';
import { IDocFilterQuery } from '../models/models';
import DocService from '../services/doc.service';

export const getAllDocs = async (req: Request<any, any, any, IDocFilterQuery>, res: Response) => {
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
};

export const getOneDoc = async (req: Request, res: Response) => {
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
};

export const updateDocInfo = async (req: Request, res: Response) => {
  const [key] = Object.keys(req.body);
  const { userId } = res.locals;
  let updateData;
  try {
    switch (key) {
      case 'categoryId':
        await DocService.addNewCategory(Number(req.body[key]), userId);
        updateData = await DocService.getOneDoc(userId);
        return res.json(updateData);
      case 'profileId':
        await DocService.addNewProfile(Number(req.body[key]), userId);
        updateData = await DocService.getOneDoc(userId);
        return res.json(updateData);
      case 'priceList':
        await DocService.addPriceList({
          price: Number(req.body[key].price),
          service: req.body[key].service,
        }, userId);
        updateData = await DocService.getOneDoc(userId);
        return res.json(updateData);
      case 'experience':
        await DocService.updateExperience(req.body[key], userId);
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
};

export const deleteDocInfo = async (req: Request, res: Response) => {
  const [key] = Object.keys(req.body);
  const { userId } = res.locals;
  let updateData;
  try {
    switch (key) {
      case 'categoryId':
        await DocService.deleteCategory(Number(req.body[key]), userId);
        updateData = await DocService.getOneDoc(userId);
        return res.json(updateData);
      case 'profileId':
        await DocService.deleteProfile(Number(req.body[key]), userId);
        updateData = await DocService.getOneDoc(userId);
        return res.json(updateData);
      case 'priceList':
        await DocService.deletePriceList(req.body[key]);
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
};
