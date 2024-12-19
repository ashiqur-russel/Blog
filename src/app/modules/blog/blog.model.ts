import mongoose, { Schema } from 'mongoose';
import { IBlog } from './blog.interface';

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isPublished: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

export const Blog = mongoose.model<IBlog>('Blog', BlogSchema);
