'use client';
import Link from 'next/link';
interface IErrorPageProps {
  error: Error;
  reset: () => void;
}
const error = ({ error, reset }: IErrorPageProps) => {
  return (
    <>
      <div className="flex flex-col items-center justify-between gap-8 mt-10">
        <h1 className="text-red-700 text-2xl font-bold">ERROR</h1>
        <p className="text-lg text-gray-600">{error?.message}</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white rounded-full px-4 py-2"
          onClick={() => reset()}
        >
          Try Again
        </button>
        <Link
          href={'/'}
          className="bg-blue-400 px-4 py-2 rounded-md  text-white"
        >
          Go to Home page
        </Link>
      </div>
    </>
  );
};

export default error;
