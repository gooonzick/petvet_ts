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
