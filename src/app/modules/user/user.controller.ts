import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/response';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { UserServices } from './user.service';

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAllUsers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users Retieved Successful',
    data: result,
  });
});

export const UserControllers = {
  getAllUser,
};
