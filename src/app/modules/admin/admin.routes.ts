import { Router } from 'express';
import { AuthGuard } from '../../middlewares/authGuard';
import { AdminControllers } from './admin.controller';

const router = Router();

// Route to block a user
router.patch(
  '/users/:userId/block',
  AuthGuard('admin'),
  AdminControllers.blockUser,
);

// Route to delete a blog
router.delete('/blogs/:id');

export const AdminRoutes = router;
