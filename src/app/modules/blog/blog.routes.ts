import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { AuthGuard } from '../../middlewares/authGuard';
import { BlogControllers } from './blog.controller';

const router = express.Router();
router.get('/blogs', AuthGuard('user'), BlogControllers.getAllBlogs);

router.post('/create-blog', AuthGuard('user'), BlogControllers.createBlog);

export const BlogRoutes = router;
