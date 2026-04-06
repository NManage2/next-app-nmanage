import { DOMAIN } from '@/utils/constants';
import { Comment } from '@prisma/client';
export async function getAllComments(token: string): Promise<Comment[]> {
  const response = await fetch(`${DOMAIN}/api/comments`, {
    headers: { Cookie: `jwtToken=${token}` },
  });
  if (!response.ok) {
    throw new Error('filed to fech comment');
  }
  return response.json();
}
