import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { AuthGuard } from '../../middlewares/authGuard';
import { BlogControllers } from './blog.controller';
import { BlogValidation } from './blog.validation';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/', BlogControllers.getAllBlogs);

router.post(
  '/',
  AuthGuard(USER_ROLE.user),
  validateRequest(BlogValidation.createBlogValidationSchema),
  BlogControllers.createBlog,
);

router.get('/:id', BlogControllers.getBlogById);

router.patch(
  '/:id',
  AuthGuard(USER_ROLE.user),
  validateRequest(BlogValidation.updateBlogValidationSchema),
  BlogControllers.updateBlog,
);

router.delete('/:id', AuthGuard(USER_ROLE.user), BlogControllers.deleteBlog);

export const BlogRoutes = router;
