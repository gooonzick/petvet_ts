import express, { Router } from 'express';
import DocController from '../controllers/doc.controller';
import isAuth from '../middlewares/isAuth';
import isAuthPriceList from '../middlewares/isAuthPriceList';

const router: Router = express.Router();

router.get('/', DocController.getAllDocs);
router.get('/:id', DocController.getOneDoc);
router.patch('/', isAuth, DocController.updateDocInfo);
router.delete('/', isAuth, isAuthPriceList, DocController.deleteDocInfo);

export default router;
