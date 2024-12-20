import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
import catchAsync from '../utils/catchAsync';
import httpStatus from 'http-status';

export const AuthGuard = (...userRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new AppError('Unauthorized', 401);
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { email, role } = decoded;

    const user = await User.isUserExistsByEmail(email);

    if (!user) {
      throw new AppError('This user is not found !', httpStatus.NOT_FOUND);
    }

    if (user.isBlocked) {
      throw new AppError('This user is blocked ! !', httpStatus.FORBIDDEN);
    }

    if (!userRole.includes(role)) {
      throw new AppError('Forbidden', 403);
    }

    next();
  });
};
