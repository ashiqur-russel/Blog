import { Types } from 'mongoose';

export type TBlogPost = {
  title: string;
  content: string;
}

export interface IBlog {
  title: string;
  content: string;
  author: Types.ObjectId;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}
