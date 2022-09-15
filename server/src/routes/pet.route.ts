import express, { Router } from 'express';
import PetController from '../controllers/pet.controller';
import isAuth from '../middlewares/isAuth';

const router: Router = express.Router();

router.route('/')
  .get(isAuth, PetController.getAllPets)
  .post(isAuth, PetController.addPet);
router.get('/:id', isAuth, PetController.getOnePet);

export default router;
