import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/response';
import httpStatus from 'http-status';
import { BlogServices } from './blog.service';

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogs();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blogs Retrieved Successfully',
    data: result,
  });
});

const createBlog = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await BlogServices.createBlog(req.body, token as string);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Blog Created Successfully',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  const { id } = req.params;
  const result = await BlogServices.deleteBlog(id, token as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog deleted successfully',
  });
});

export const BlogControllers = {
  createBlog,
  getAllBlogs,
  deleteBlog,
};
