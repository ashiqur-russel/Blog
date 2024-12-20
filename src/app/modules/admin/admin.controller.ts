import { Request, Response } from 'express';
import sendResponse from '../../utils/response';
import catchAsync from '../../utils/catchAsync';
import { AdminServices } from './admin.services';
import httpStatus from 'http-status';

const blockUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  await AdminServices.blockUser(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User blocked successfully',
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await AdminServices.deleteBlog(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog deleted successfully',
  });
});

export const AdminControllers = {
  blockUser,
  deleteBlog,
};
