import config from '../../config';
import AppError from '../../errors/AppError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import httpStatus from 'http-status';

const getAllUsers = async (): Promise<IUser[]> => {
  return await User.find();
};

export const UserServices = {
  getAllUsers,
};
