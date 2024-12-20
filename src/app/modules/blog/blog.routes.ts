import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { AuthGuard } from '../../middlewares/authGuard';
import { BlogControllers } from './blog.controller';
import { BlogValidation } from './blog.validation';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();
router.get('/', BlogControllers.getAllBlogs);

router.post(
  '/create-blog',
  AuthGuard('user'),
  validateRequest(BlogValidation.createBlogValidationSchema),
  BlogControllers.createBlog,
);
router.patch('/:id', AuthGuard(USER_ROLE.user), BlogControllers.updateBlog);

router.delete('/:id', AuthGuard('user'), BlogControllers.deleteBlog);

export const BlogRoutes = router;
