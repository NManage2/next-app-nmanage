'use client';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { DOMAIN } from '@/utils/constants';
interface UpdateCommentModalProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  text: string;
  commentId: number;
}
const UpdateCommentModal = ({
  setOpen,
  text,
  commentId,
}: UpdateCommentModalProps) => {
  const router = useRouter();
  const [updatedText, setUpdatedText] = useState(text);
  const formSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (updatedText === '') return toast.info('please write something');
    try {
      await axios.put(`${DOMAIN}/api/comments/${commentId}`, {
        text: updatedText,
      });
      router.refresh();
      setUpdatedText('');
      setOpen(false);
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
    <div className="fixed top-0 left-0 bottom-0 right-0 bg-black  opacity-75 flex justify-center items-center">
      <div className="w-2/4 bg-white rounded-lg p-3 opacity-200">
        <div className="flex justify-end items-start">
          <IoMdCloseCircleOutline
            onClick={() => setOpen(false)}
            className="text-red-500 cursor-pointer text-xl mb-5"
          />
        </div>
        <form onSubmit={formSubmitHandler}>
          <input
            type="text"
            placeholder="Edit Comment..."
            className="text-xl rounded-lg p-2 w-full bg-white  mb-2 "
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
          />

          <button
            type="submit"
            className="bg-green-700 w-full text-white mt-2 p-1 text-sm hover:bg-green-900 transition"
          >
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCommentModal;
