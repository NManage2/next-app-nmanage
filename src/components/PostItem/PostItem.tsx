//import { TPost } from '@/utils/types';
import { Post } from '@prisma/client';
import Link from 'next/link';

interface IPostProps {
  post: Post;
}
const PostItem = ({ post }: IPostProps) => {
  return (
    <div
      className="p-2 md:w-2/5 lg:w-1/4 bg-gray-400 border-2 border-blue-400 rounded-md"
      key={post.id}
    >
      <h2 className="text-2xl font-bold text-green-400 line-clamp-1">
        {post.title}
      </h2>
      <p className="text-sm text-gray-600 line-clamp-1">{post.content}</p>
      <Link href={`/posts/${post.id}`}>Read More...</Link>
    </div>
  );
};

export default PostItem;
