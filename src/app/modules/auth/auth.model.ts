import { Schema } from 'mongoose';
import { TRegisterUser } from './auth.interface';

export const RegisterSchema = new Schema<TRegisterUser>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});
