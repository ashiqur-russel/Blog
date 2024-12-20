import express from 'express';
import { AuthGuard } from '../../middlewares/authGuard';
import { UserControllers } from './user.controller';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.get('/', AuthGuard(USER_ROLE.admin), UserControllers.getAllUser);

export const UserRoutes = router;
