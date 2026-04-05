import { getSinglePost } from '@/apiCalls/postsApiCalls';
import AddCommentForm from '@/components/Comments/AddCommentForm';
import CommentItem from '@/components/Comments/CommentItem';
//import { Post } from '@/generated/prisma/client';
import { SinglePost } from '@/utils/types';
import { verifyTokenForPage } from '@/utils/verifyToken';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
interface PostResponse {
  post: SinglePost;
}
const PostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const token = (await cookies()).get('jwtToken')?.value || '';
  const payload = verifyTokenForPage(token);
  const { id } = await params;

  const data: PostResponse = await getSinglePost(id);
  const post = data.post; // On récupère l'objet imbriqué

  // Maintenant post.title (qui vaut "GoLang") fonctionnera
  console.log(post.title);
  // Sécurité : si le post n'existe pas
  if (!post) {
    return notFound();
  }

  return (
    <>
      <div className="container mx-auto">
        <div
          className="my-4 mx-auto p-2 md:w-2/3  bg-gray-400 border-2 border-blue-400 rounded-md"
          key={post?.id}
        >
          <h2 className="text-2xl font-bold text-green-400 ">{post.title}</h2>
          <div className="text-gray-400">
            {new Date(post.publishedAt).toDateString()}
          </div>
          <p className="text-sm text-gray-600 ">{post.content}</p>
        </div>
        <div className="mb-7">
          {payload ? (
            <AddCommentForm postId={post.id} />
          ) : (
            <p className="text-blue-600 md: text-sm">
              to write comment you should login first
            </p>
          )}
        </div>

        {post.comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            userId={payload?.id}
          />
        ))}
      </div>
    </>
  );
};
export default PostPage;
