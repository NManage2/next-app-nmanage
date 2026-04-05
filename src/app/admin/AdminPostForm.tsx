'use client';
import { DOMAIN } from '@/utils/constants';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AdminPostForm = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    if (title === '') toast.error('title is required');
    if (content === '') toast.error('description is required');
    try {
      await axios.post(`${DOMAIN}/api/posts`, { title, content });
      setTitle('');
      setContent('');
      toast.success('new post added');
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
      <p className="text-sm text-gray-500">Add Post Details</p>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-7">
        <label htmlFor="title" className="flex flex-col text-lg text-gray-700">
          <span className="mb-1">Title</span>
          <input
            type="text"
            id=""
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </label>

        <label
          htmlFor="description"
          className="flex flex-col text-lg text-gray-700"
        >
          <span className="mb-1">content</span>
          <textarea
            id="content"
            placeholder="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white p-2 rounded-lg font-medium shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:cursor-pointer"
      >
        Add Post
      </button>
    </form>
  );
};

export default AdminPostForm;
