import AppError from '../../errors/AppError';
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

export const AdminServices = {
  blockUser,
};
