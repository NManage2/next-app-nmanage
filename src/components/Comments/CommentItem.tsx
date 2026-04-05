'use client';
import { CommentWithUser } from '@/utils/types';
import { FaEdit, FaTrash } from 'react-icons/fa';
import UpdateCommentModal from './UpdateCommentModal';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';
import { DOMAIN } from '@/utils/constants';

interface ICommentItemProps {
  comment: CommentWithUser;
  userId: number | undefined;
}
const CommentItem = ({ comment, userId }: ICommentItemProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const commentDeleteHandler = async () => {
    try {
      if (confirm('you want delete this comment are you sure?')) {
        await axios.delete(`${DOMAIN}/api/comments/${comment.id}`);
        router.refresh();
      }
    } catch (error) {
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
    <div className="mb-5 rounded-lg p-3 bg-gray-200 gap-3 py-4 border-b border-gray-300">
      <div className="flex items-center justify-between mb-2">
        <strong className="text-gray-800 uppercase">
          {' '}
          {comment.user.username}{' '}
        </strong>
        <span className="bg-yellow-300 px-1 rounded-lg">
          {new Date(comment.createdAt).toDateString()}{' '}
        </span>
      </div>
      <p className="text-gray-700 mb-2">{comment.text}</p>
      {userId && userId === comment.userId && (
        <div className="flex items-center justify-end">
          <FaEdit
            onClick={() => setOpen(true)}
            className="text-green-600 text-sm cursor-pointer me-3"
          />
          <FaTrash
            onClick={commentDeleteHandler}
            className="text-red-600 text-sm cursor-pointer "
          />
        </div>
      )}

      {open && (
        <UpdateCommentModal
          setOpen={setOpen}
          text={comment.text}
          commentId={comment.id}
        />
      )}
    </div>
  );
};

export default CommentItem;
