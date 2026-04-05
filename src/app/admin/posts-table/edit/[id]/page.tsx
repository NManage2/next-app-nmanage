import { getSinglePost } from '@/apiCalls/postsApiCalls';
import { verifyTokenForPage } from '@/utils/verifyToken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import EditPostForm from './editPostForm';

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

const EditPostPage = async ({ params }: EditPostPageProps) => {
  const { id } = await params;
  const token = (await cookies()).get('jwtToken')?.value || '';
  if (!token) redirect('/');
  const payload = verifyTokenForPage(token);
  if (payload?.isAdmin === false) redirect('/');

  // 1. Appelez l'API (qui renvoie un objet PostResponse)
  const response = await getSinglePost(id);

  // 2. Extrayez le post de la réponse (ajustez selon votre type PostResponse)
  const post = response.post;

  if (!post) redirect('/404'); // Sécurité si le post n'existe pas
  return (
    <section className=" fix-height flex items-center justify-center px-5 lg:px-20">
      <div className="shadow p-4 bg-purple-200 rounded w-full">
        <h2 className="text-xl text-green-500 font-semibold mb-4">
          Edit Article
        </h2>
        <EditPostForm post={post} />
      </div>
    </section>
  );
};

export default EditPostPage;
