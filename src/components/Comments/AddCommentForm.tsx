'use client';
import { DOMAIN } from '@/utils/constants';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
interface AddCommentPropsForm {
  postId: number;
}
const AddCommentForm = ({ postId }: AddCommentPropsForm) => {
  const router = useRouter();
  const [text, setCommentText] = useState('');
  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    if (text === '') toast.error('Comment is required');
    try {
      await axios.post(`${DOMAIN}/api/comments`, { text, postId });
      setCommentText('');
      router.refresh();
    } catch (error) {
      // On vérifie si l'erreur provient bien d'Axios
      if (axios.isAxiosError(error)) {
        // On accède aux données de la réponse en toute sécurité
        const message =
          error.response?.data?.message || 'Une erreur est survenue';
        toast.error(message);
      } else {
        // Si c'est une erreur JavaScript classique (ex: crash réseau)
        toast.error('Une erreur inattendue est survenue');
      }
    }
  };
  return (
    <form onSubmit={handleSubmit} className="my-4 mx-auto w-full md:w-2/3">
      <input
        type="text"
        placeholder="Add a comment..."
        value={text}
        onChange={(e) => setCommentText(e.target.value)}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300 mb-6"
      />

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white p-2 rounded-lg font-medium shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:cursor-pointer"
      >
        Comment
      </button>
    </form>
  );
};

export default AddCommentForm;
