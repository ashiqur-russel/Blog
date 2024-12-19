import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';

const registerUser = async (payload: IUser) => {
  console.log(payload);

  const result = await User.create(payload);

  return result;
};

export const AuthServices = {
  registerUser,
};
