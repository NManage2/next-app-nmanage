'use client';
import { DOMAIN } from '@/utils/constants';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface DeletePostButtonProps {
  postId: number;
}

const DeletePostButton = ({ postId }: DeletePostButtonProps) => {
  const router = useRouter();
  const deletePostHandler = async () => {
    try {
      if (confirm('you want delete this post, are you sure?')) {
        await axios.delete(`${DOMAIN}/api/posts/${postId}`);
        router.refresh();
        toast.success('post deleted');
      }
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
    <div
      onClick={deletePostHandler}
      className="bg-red-600 text-white rounded-lg cursor-pointer inline-block text-center py-1 px-2 hover:bg-red-800 transition"
    >
      Delete
    </div>
  );
};

export default DeletePostButton;
