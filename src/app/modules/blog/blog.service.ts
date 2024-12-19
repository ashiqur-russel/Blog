import config from '../../config';
import AppError from '../../errors/AppError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import httpStatus from 'http-status';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';
import jwt, { JwtPayload } from 'jsonwebtoken';

const createBlog = async (payload: IBlog, token: string): Promise<any> => {
  // this is not necessary to check as already AuthGuard is implemented on route level
  if (!token) {
    throw new AppError('Unauthorized!', httpStatus.UNAUTHORIZED);
  }

  try {

    const user = await getUserDetails(token)
   
    const newBlog = new Blog({ ...payload, author: user?._id });

    const blog = await Blog.create(newBlog);
    const populatedBlog = await Blog.findById(blog._id)
      .populate('author', 'name email')
      .select('-isPublished -createdAt -updatedAt -__v');

    return populatedBlog;
  } catch (error) {
    throw new AppError('Failed to create blog', httpStatus.BAD_REQUEST);
  }
};

const getUserDetails = async (token: string)=>{

    const bearerToken = token.split(' ')[1];
    const decoded = jwt.verify(bearerToken, config.jwt_access_secret as string);
    const { email } = decoded as JwtPayload;

    return await User.isUserExistsByEmail(email);

}

const getAllBlogs = async (): Promise<IUser[]> => {
  return await User.find();
};

export const BlogServices = {
  createBlog,
  getAllBlogs,
};
