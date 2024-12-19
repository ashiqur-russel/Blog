import { AuthServices } from './auth.service';
import { Request, Response } from 'express';

const register = async (req: Request, res: Response) => {
  console.log('register', req.body);
  const result = await AuthServices.registerUser(req.body);

  res.status(201).json({
    message: 'User created successfully',
    status: true,
    data: result,
  });
};

export const AuthControllers = {
  register,
};
