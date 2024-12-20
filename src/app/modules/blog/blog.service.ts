import config from '../../config';
import AppError from '../../errors/AppError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import httpStatus from 'http-status';
import { Blog } from './blog.model';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IBlog } from './blog.interface';

const createBlog = async (payload: IBlog, token: string): Promise<any> => {
  // this is not necessary to check as already AuthGuard is implemented on route level
  if (!token) {
    throw new AppError('Unauthorized!', httpStatus.UNAUTHORIZED);
  }

  try {
    const user = await getUserDetails(token);
    if (!user) {
      throw new AppError('User not found', httpStatus.NOT_FOUND);
    }

    const newBlog = new Blog({ ...payload, author: user?._id });

    const blog = await Blog.create(newBlog);
    const populatedBlog = await Blog.findById(blog._id)
      .populate('author', 'name email')
      .select('-isPublished -createdAt -updatedAt -__v');

    return populatedBlog;
  } catch (error: any) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError('Failed to create blog', httpStatus.BAD_REQUEST);
  }
};

const getUserDetails = async (token: string) => {
  const bearerToken = token.split(' ')[1];
  const decoded = jwt.verify(bearerToken, config.jwt_access_secret as string);
  const { email } = decoded as JwtPayload;

  return await User.getUserDetails(email);
};

const getAllBlogs = async (): Promise<IUser[]> => {
  return await Blog.find();
};

const deleteBlog = async (id: string, token: string): Promise<void> => {
  try {
    const user = await getUserDetails(token);

    if (!user) {
      throw new AppError('User not authenticated', httpStatus.UNAUTHORIZED);
    }

    const blog = await Blog.findById(id).populate<{ author: IUser }>(
      'author',
      'email',
    );

    if (!blog) {
      throw new AppError('Blog not found', httpStatus.NOT_FOUND);
    }

    if (user.email !== blog.author?.email) {
      throw new AppError(
        'You are not authorized to delete this blog',
        httpStatus.UNAUTHORIZED,
      );
    }

    await Blog.findByIdAndDelete(id);
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      'Failed to delete Blog',
      httpStatus.INTERNAL_SERVER_ERROR,
    );
  }
};

const updateBlog = async (
  id: string,
  updatedData: Partial<IBlog>,
  token: string,
): Promise<void> => {
  const user = await getUserDetails(token);

  if (!user) {
    throw new AppError('User not authenticated', httpStatus.UNAUTHORIZED);
  }

  const blog = await Blog.findById(id).populate<{ author: IUser }>(
    'author',
    'email',
  );

  if (!blog) {
    throw new AppError('Blog not found', httpStatus.NOT_FOUND);
  }

  if (user.email !== blog.author?.email) {
    throw new AppError(
      'You are not authorized to update this blog',
      httpStatus.UNAUTHORIZED,
    );
  }

  await Blog.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });
};

export const BlogServices = {
  createBlog,
  getAllBlogs,
  deleteBlog,
  updateBlog,
};
