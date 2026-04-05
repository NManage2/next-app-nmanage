import { getPostsBasedOnSearch } from '@/apiCalls/postsApiCalls';
import PostItem from '@/components/PostItem/PostItem';
import { Post } from '@/generated/prisma/client';

interface ISearchResultProps {
  searchParams: Promise<{ searchText: string }>; // Notez le 's' à searchParams et le type Promise
}

const SearchResult = async ({ searchParams }: ISearchResultProps) => {
  //const { query } = await searchParams; // On attend la résolution de la promise
  const { searchText } = await searchParams;
  const posts: Post[] = await getPostsBasedOnSearch(searchText);
  return (
    <div className="fix-height container m-auto px-5">
      {posts.length === 0 ? (
        <h2 className="text-2xl font-bold p-5 text-gray-800">
          Posts based on <span className="!text-red-500">Bous Nour</span> not
          found
        </h2>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-5 mt-7 text-gray-800">
            Posts based on <span>{searchText}</span>
          </h1>
          <div className="flex items-center justify-center flex-wrap gap-7">
            {posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchResult;
