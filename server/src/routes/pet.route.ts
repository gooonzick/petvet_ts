import express, { Router } from 'express';
import { getAllPets, getOnePet, addPet } from '../controllers/pet.controller';
import isAuth from '../middlewares/isAuth';

const router: Router = express.Router();

router.route('/')
  .get(isAuth, getAllPets)
  .post(isAuth, addPet);
router.get('/:id', isAuth, getOnePet);

export default router;
