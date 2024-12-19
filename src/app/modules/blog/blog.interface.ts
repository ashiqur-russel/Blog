import mongoose, { Types } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  content: string;
  author: Types.ObjectId;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}
