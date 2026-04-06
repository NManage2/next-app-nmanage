import { getPosts, getPostsCount } from '@/apiCalls/postsApiCalls';
import Pagination from '@/components/Pagination/Pagination';
import PostItem from '@/components/PostItem/PostItem';
import SearchPostInput from '@/components/SearchPostInput/SearchPostInput';
import { Post } from '@prisma/client';
import { POST_PER_PAGE } from '@/utils/constants';

interface IPostPageProps {
  // Dans Next.js 14+, searchParams peut être une Promise
  searchParams: { pageNumber?: string };
}

const PostsPage = async ({ searchParams }: IPostPageProps) => {
  const params = await searchParams;
  const pageNumber = params.pageNumber || '1';
  // Récupération des données directement côté serveur
  // Note : Utilise fetch au lieu d'axios pour profiter du cache Next.js
  const posts: Post[] = await getPosts(pageNumber);
  const count: number = await getPostsCount();
  const pages: number = Math.ceil(count / POST_PER_PAGE); // math_ceil: 25/6=5
  return (
    <div className="container m-auto px-4">
      <SearchPostInput />
      <div className="flex items-center justify-center flex-wrap gap-7">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
      <Pagination
        pageNumber={parseInt(pageNumber)}
        route="/posts"
        pages={pages}
      />
    </div>
  );
};

export default PostsPage;
/*'use client';
import Pagination from '@/components/Pagination/Pagination';
import PostItem from '@/components/PostItem/PostItem';
import SearchPostInput from '@/components/SearchPostInput/SearchPostInput';
import { Post } from '@/generated/prisma/client';
import axios from 'axios';
import { useEffect, useState } from 'react';
interface IPostPageProps {
  searchParams: { pageNumber: string };
}
const PostsPage = ({ searchParams }: IPostPageProps) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { pageNumber } = searchParams;
        const res = await axios.get(
          // 'https://jsonplaceholder.typicode.com/posts',
          `http://localhost:3000/api/posts?pageNumber=${pageNumber || '1'}`,
        );
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, [searchParams.pageNumber]);
  return (
    <>
      <div className="container m-auto px-4">
        <SearchPostInput />
        <div className="flex items-center justify-center flex-wrap gap-7">
          {/*   {posts?.slice(0, 15).map((post) => ( */
/*  {posts?.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
        <Pagination />
      </div>
    </>
  );
};

export default PostsPage;*/
