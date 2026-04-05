import { z } from 'zod';
export const createPostSchema = z.object({
  title: z.string().min(3, 'title must be at least 3').max(100),
  content: z.string().min(10),
});
export const createCommentSchema = z.object({
  text: z.string().min(2).max(500),
  postId: z.number(),
});

export const updateUserSchema = z.object({
  username: z.string().min(5).max(15).optional(),
  email: z.string().min(2).max(200).email().optional(),
  password: z.string().min(6).optional(),
});
