import express from 'express';
import { AuthGuard } from '../../middlewares/authGuard';
import { UserControllers } from './user.controller';

const router = express.Router();
router.get('/', AuthGuard('admin'), UserControllers.getAllUser);

export const UserRoutes = router;
