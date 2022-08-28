import express, { Router } from 'express';
import { signIn, signUp } from '../controllers/auth.controller';

const router: Router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);

export default router;
