import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/response';
import { AuthServices } from './auth.service';
import { Request, Response } from 'express';

const register = catchAsync(async (req: Request, res: Response) => {
    console.log('Incoming Request Body:', req.body);

    const result = await AuthServices.registerUser(req.body);
  
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'User registered successfully',
      data: { _id: result._id ,name: result.name, email: result.email },
    });
  })

export const AuthControllers = {
  register,
};
