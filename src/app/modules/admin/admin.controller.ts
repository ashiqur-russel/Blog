import { Request, Response } from 'express';
import sendResponse from '../../utils/response';
import catchAsync from '../../utils/catchAsync';
import { AdminServices } from './admin.services';
import httpStatus from 'http-status';

const blockUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  console.log(req.params);
  const result = await AdminServices.blockUser(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User blocked successfully',
  });
});

export const AdminControllers = {
  blockUser,
};
