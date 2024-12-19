import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface IUser {
  name: string;
  email: string;
  password: string;
  isBlocked: boolean;
  role: 'admin' | 'user';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserModel extends Model<IUser> {
  isUserExistsByEmail(id: string): Promise<IUser>;
  isUserBlocked(id: string): Promise<string>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
