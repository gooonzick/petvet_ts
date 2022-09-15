import express, { Router } from 'express';
import UserController from '../controllers/user.controller';
import isAuth from '../middlewares/isAuth';

const router: Router = express.Router();

router.patch('/', isAuth, UserController.updateUserInfo);

export default router;
