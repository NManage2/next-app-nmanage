import { verifyTokenForPage } from '@/utils/verifyToken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Post } from '@/generated/prisma/client';
import { getPosts, getPostsCount } from '@/apiCalls/postsApiCalls';
import { POST_PER_PAGE } from '@/utils/constants';
import Link from 'next/link';
import Pagination from '@/components/Pagination/Pagination';
import DeletePostButton from './DeletePostButton';

interface AdminPostsTableProps {
  searchParams: { pageNumber: string };
}
const AdminPostsTable = async ({ searchParams }: AdminPostsTableProps) => {
  const params = await searchParams;
  const pageNumber = params.pageNumber || '1';

  const token = (await cookies()).get('jwtToken')?.value || '';
  if (!token) redirect('/');
  const payload = verifyTokenForPage(token);
  if (payload?.isAdmin === false) redirect('/');

  const postes: Post[] = await getPosts(pageNumber);
  const count: number = await getPostsCount();
  const pages = Math.ceil(count / POST_PER_PAGE);
  return (
    <section className="p-5">
      <h1 className="mb-7 text-xl font-semibold text-gray-700">Postes</h1>
      <table className="table w-full text-left">
        <thead className="border-t-2 borger-b-2 border-gray-500 lg:text-xl">
          <tr>
            <th className="p-1 lg:p-2">Titlle</th>
            <th className="hidden lg:inline-block">Created At</th>
            <th>Action</th>
            <th className="hidden lg:inline-block"></th>
          </tr>
        </thead>
        <tbody>
          {postes.map((post) => (
            <tr key={post.id} className="border-b border-t border-gray-300">
              <td className="p3 text-gray-700">{post.title}</td>
              <td className="p3 text-gray-700 font-normal hidden lg:inline-block">
                {new Date(post.publishedAt).toDateString()}
              </td>
              <td className="p3">
                <Link
                  href={`/admin/posts-table/edit/${post.id}`}
                  className="text-sm bg-green-600 text-white rounded-lg py-1 px-2 inline-block text-center mb-2 me-2 lg:me-3 hover:bg-green-800 transition"
                >
                  Edit
                </Link>
                <DeletePostButton postId={post.id} />
              </td>
              <td className="hidden lg:inline-block p-3">
                <Link
                  href={`/posts/${post.id}`}
                  className="text-white bg-blue-600 rounded-lg p-2  hover:bg-blue-800"
                >
                  Read More
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        pageNumber={parseInt(pageNumber)}
        pages={pages}
        route="/admin/posts-table"
      />
    </section>
  );
};

export default AdminPostsTable;
