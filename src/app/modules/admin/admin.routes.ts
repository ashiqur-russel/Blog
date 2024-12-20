import { Router } from 'express';
import { AuthGuard } from '../../middlewares/authGuard';
import { AdminControllers } from './admin.controller';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

// Route to block a user
router.patch(
  '/users/:userId/block',
  AuthGuard('admin'),
  AdminControllers.blockUser,
);

// Route to delete a blog
router.delete(
  '/blogs/:id',
  AuthGuard(USER_ROLE.admin),
  AdminControllers.deleteBlog,
);

export const AdminRoutes = router;
