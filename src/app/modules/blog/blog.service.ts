import config from '../../config';
import AppError from '../../errors/AppError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import httpStatus from 'http-status';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';
import jwt, { JwtPayload } from 'jsonwebtoken';

const createBlog = async (payload: IBlog, token: string): Promise<any> => {
  if (!token) {
    throw new AppError('User is not logged in', httpStatus.UNAUTHORIZED);
  }

  const bearerToken = token.split(' ')[1];
  const decoded = jwt.verify(bearerToken, config.jwt_access_secret as string);
  const { email } = decoded as JwtPayload;

  const user = await User.isUserExistsByEmail(email);
  const newBlog = new Blog({ ...payload, author: user?._id });

  const blog = await Blog.create(newBlog);
  const populatedBlog = await Blog.findById(blog._id)
    .populate('author', 'name email role')
    .select('-isPublished -createdAt -updatedAt -__v');
  return populatedBlog;
};

const getAllBlogs = async (): Promise<IUser[]> => {
  return await User.find();
};
export const BlogServices = {
  createBlog,
  getAllBlogs,
};
