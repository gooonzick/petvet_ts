import express, { Router } from 'express';
import AllergyController from '../controllers/allergies.controller';
import isAuth from '../middlewares/isAuth';

const router: Router = express.Router();

router.post('/', isAuth, AllergyController.createNewAllergy);

export default router;
