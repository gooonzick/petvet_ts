import express, { Router } from 'express';
import { getAllCategories } from '../controllers/category.controller';

const router: Router = express.Router();

router.get('/', getAllCategories);

export default router;
