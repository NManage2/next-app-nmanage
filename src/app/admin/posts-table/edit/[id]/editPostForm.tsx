'use client';
import { Post } from '@/generated/prisma/client';
import { DOMAIN } from '@/utils/constants';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
interface EditPostFormProps {
  post: Post;
}
const EditPostForm = ({ post }: EditPostFormProps) => {
  const router = useRouter();
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    if (title === '') toast.error('title is required');
    if (content === '') toast.error('description is required');
    try {
      await axios.put(`${DOMAIN}/api/posts/${post.id}`, { title, content });
      toast.success('post apdated');
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
  console.log(title, content);
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 ">
      {/*<p className="text-sm text-gray-500">Add Post Details</p>*/}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-7">
        <label
          htmlFor="title"
          className="flex flex-col text-base text-gray-700"
        >
          <span className="mb-1">Title</span>
          <input
            type="text"
            id=""
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </label>

        <label
          htmlFor="description"
          className="flex flex-col text-base text-gray-700"
        >
          <span className="mb-1">content</span>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white p-2 rounded-lg font-medium shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:cursor-pointer"
      >
        EDIT Post
      </button>
    </form>
  );
};

export default EditPostForm;
