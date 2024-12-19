import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/response';
import httpStatus from 'http-status';
import { BlogServices } from './blog.service';

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogs();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users Retieved Successful',
    data: result,
  });
});

const createBlog = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  console.log('create blog');

  const result = await BlogServices.createBlog(req.body, token as string);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Blog Created Successfully',
    data: result,
  });
});

export const BlogControllers = {
  createBlog,
  getAllBlogs,
};
