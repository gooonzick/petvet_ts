import express, { Router } from 'express';
import {
  deleteDocInfo, getAllDocs, getOneDoc, updateDocInfo,
} from '../controllers/doc.controller';
import isAuth from '../middlewares/isAuth';
import isAuthPriceList from '../middlewares/isAuthPriceList';

const router: Router = express.Router();

router.get('/', getAllDocs);
router.get('/:id', getOneDoc);
router.patch('/', isAuth, updateDocInfo);
router.delete('/', isAuth, isAuthPriceList, deleteDocInfo);

export default router;
