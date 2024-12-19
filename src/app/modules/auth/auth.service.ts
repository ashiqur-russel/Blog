import config from '../../config';
import AppError from '../../errors/AppError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';

const loginUser = async (payload: TLoginUser) => {
  const { email, password } = payload;
  console.log(email)


  const user = await User.findOne({email}).select('+password');

  console.log(password, user)

  if (user?.password !== password) {
    throw new AppError('Invalid credentials', httpStatus.FORBIDDEN);
  }

  const token = jwt.sign({ email: user.email }, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_secret_expires,
  });

  return { token };
};

const registerUser = async (payload: IUser) => {
  return await User.create(payload);
};

export const AuthServices = {
  loginUser,
  registerUser,
};
