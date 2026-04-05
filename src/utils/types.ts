import { Post, Comment, User } from '@/generated/prisma/client';

type TUserPayload = {
  id: number;
  username: string;
  isAdmin: boolean;
};

export type { TUserPayload };

export type CommentWithUser = Comment & { user: User };
export type SinglePost = Post & { comments: CommentWithUser[] };
