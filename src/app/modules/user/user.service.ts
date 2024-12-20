import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';

const getAllUsers = async (): Promise<IUser[]> => {
  return await User.find();
};

export const UserServices = {
  getAllUsers,
};
