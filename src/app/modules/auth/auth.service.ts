import config from '../../config';
import AppError from '../../errors/AppError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';

const loginUser = async (payload: TLoginUser) => {
  const { email, password } = payload;

  const user = await User.isUserExistsByEmail(email);

  if (!user) {
    throw new AppError('User Not exist with the email id !', 409);
  }

  if (await User.isPasswordMatched(password, user.password)) {
    const JwtPayload = {
      email,
      role: user.role,
    };

    const token = jwt.sign(JwtPayload, config.jwt_access_secret as string, {
      expiresIn: config.jwt_access_secret_expires,
    });

    return { token };
  } else {
    throw new AppError('Invalid credentials', 401);
  }
};

const registerUser = async (payload: IUser) => {
  return await User.create(payload);
};

export const AuthServices = {
  loginUser,
  registerUser,
};
