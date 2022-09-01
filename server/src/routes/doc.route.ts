import express, { Router } from 'express';
import { getAllDocs, getOneDoc } from '../controllers/doc.controller';

const router: Router = express.Router();

router.get('/', getAllDocs);
router.get('/:id', getOneDoc);

export default router;
