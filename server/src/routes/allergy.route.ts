import express, { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import isAuth from '../middlewares/isAuth';

const router: Router = express.Router();

router.post('/', isAuth, AuthController.signUp);

export default router;
