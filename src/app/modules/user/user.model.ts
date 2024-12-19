import mongoose, { Schema } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

export const userSchema = new Schema<IUser, UserModel>(
  {
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
    isBlocked: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistsByEmail = async function (email) {
  return await this.findOne({ email }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = mongoose.model<IUser, UserModel>('User', userSchema);
