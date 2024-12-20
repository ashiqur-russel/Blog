import AppError from '../../errors/AppError';
import { Blog } from '../blog/blog.model';
import { User } from '../user/user.model';
import httpStatus from 'http-status';

const blockUser = async (userId: string): Promise<void> => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError('User not found', httpStatus.NOT_FOUND);
  }

  if (user.isBlocked) {
    throw new AppError('User is already blocked', httpStatus.BAD_REQUEST);
  }

  await User.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    { new: true, runValidators: true },
  );
};

const deleteBlog = async (blogId: string): Promise<void> => {
  const blog = await Blog.findById({ _id: blogId });

  if (!blog) {
    throw new AppError('Blog not found', httpStatus.NOT_FOUND);
  }

  await Blog.findByIdAndDelete({ _id: blogId });
};

export const AdminServices = {
  blockUser,
  deleteBlog,
};
