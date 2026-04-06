import { Post } from '@prisma/client';
import { DOMAIN } from '@/utils/constants';
import { SinglePost } from '@/utils/types';

export async function getPosts(
  pageNumber: string | undefined,
): Promise<Post[]> {
  const response = await fetch(
    `http://localhost:3000/api/posts?pageNumber=${pageNumber}`,
    { cache: 'no-store' }, // Pour garantir des données fraîches à chaque page
  );
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des posts');
  }
  return await response.json();
}

// nombre de posts
export async function getPostsCount(): Promise<number> {
  const response = await fetch(
    `http://localhost:3000/api/posts/count`,
    { cache: 'no-store' }, // Pour garantir des données fraîches à chaque page
  );
  if (!response.ok) {
    throw new Error('Erreur nombre de posts');
  }
  const { count } = await response.json();
  return count;
}

// search
export async function getPostsBasedOnSearch(
  searchText: string,
): Promise<Post[]> {
  const response = await fetch(
    `http://localhost:3000/api/posts/search?searchText=${searchText}`,
    { cache: 'no-store' }, // Pour garantir des données fraîches à chaque page
  );
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des posts');
  }
  return await response.json();
}

interface PostResponse {
  post: SinglePost;
}
// Change Promise<SinglePost> par Promise<{ post: SinglePost }>
export async function getSinglePost(posteId: string): Promise<PostResponse> {
  const response = await fetch(`${DOMAIN}/api/posts/${posteId}`, {
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('Failed to fetch post');
  return response.json(); // Retourne { post: { ... } }
}
