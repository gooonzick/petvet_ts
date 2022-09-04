import express, { Router } from 'express';
import { getAllProfiles } from '../controllers/profile.controller';

const router: Router = express.Router();

router.get('/', getAllProfiles);

export default router;
