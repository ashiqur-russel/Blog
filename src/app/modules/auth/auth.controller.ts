import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/response';
import { AuthServices } from './auth.service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login Successful',
    data: { token: result.token },
  });
});

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.registerUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data: { _id: result._id, name: result.name, email: result.email },
  });
});

export const AuthControllers = {
  login,
  register,
};
