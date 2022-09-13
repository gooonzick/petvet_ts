import express, { Router } from 'express';
import {
  deleteDocInfo, getAllDocs, getOneDoc, updateDocInfo,
} from '../controllers/doc.controller';
import isAuth from '../middlewares/isAuth';

const router: Router = express.Router();

router.get('/', getAllDocs);
router.get('/:id', getOneDoc);
router.patch('/', isAuth, updateDocInfo);
router.delete('/', isAuth, deleteDocInfo);

export default router;
