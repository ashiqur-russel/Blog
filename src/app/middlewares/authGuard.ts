import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

export const AuthGuard = (...userRole: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new AppError('Unauthorized', 401);
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    if (!userRole.includes(decoded?.role)) {
      throw new AppError('Forbidden', 403);
    }

    next();
  };
};
