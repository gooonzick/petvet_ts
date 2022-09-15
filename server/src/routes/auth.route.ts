import express, { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const router: Router = express.Router();

router.post('/signup', AuthController.signUp);
router.post('/signin', AuthController.signIn);

export default router;
