import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { AuthGuard } from '../../middlewares/authGuard';
import { BlogControllers } from './blog.controller';
import { BlogValidation } from './blog.validation';

const router = express.Router();
router.get('/blogs', BlogControllers.getAllBlogs);

router.post(
  '/create-blog',
  AuthGuard('user'),
  validateRequest(BlogValidation.createBlogValidationSchema),
  BlogControllers.createBlog,
);

router.delete('/:id', AuthGuard('user'), BlogControllers.deleteBlog);

export const BlogRoutes = router;
