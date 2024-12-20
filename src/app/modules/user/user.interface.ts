/* eslint-disable */
import mongoose, { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface IUser {
  _id: mongoose.ObjectId;
  name: string;
  email: string;
  password: string;
  isBlocked: boolean;
  role: 'admin' | 'user';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserModel extends Model<IUser> {
  isUserExistsByEmail(email: string): Promise<IUser>;
  getUserDetails(email: string): Promise<IUser>;
  isUserBlocked(id: string): Promise<boolean>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
