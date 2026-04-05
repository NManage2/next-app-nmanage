'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import { DOMAIN } from '@/utils/constants';
import ButtonSpinner from '@/components/ButtonSpinner';

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loding, setLoding] = useState(false);
  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    if (email === '') toast.error('email is required');
    if (password === '') toast.error('password is required');
    try {
      setLoding(true);
      await axios.post(`${DOMAIN}/api/users/login`, { email, password });
      router.replace('/');
      setLoding(false);
      router.refresh();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || 'Une erreur est survenue';
        toast.error(message);
      } else {
        toast.error('Erreur de connexion au serveur');
      }
      setLoding(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 ">
      <p className="text-sm text-gray-500">Sign In your account to continue</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        <label htmlFor="email" className="flex flex-col text-sm text-gray-700">
          <span className="mb-1">Email</span>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </label>

        <label
          htmlFor="password"
          className="flex flex-col text-sm text-gray-700"
        >
          <span className="mb-1">Password</span>
          <input
            type="password"
            id="password"
            placeholder="*********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </label>
      </div>
      <div className="flex items-center justify-between text-sm">
        <label className="inline-flex items-center gap-2 text-gray-600">
          <input
            type="checkbox"
            className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus: ring-indigo-500"
          />
          Remember Me
        </label>
        <Link href="#" className="text-indigo-600 hover:underline">
          Forgot Password?
        </Link>
      </div>
      <button
        disabled={loding}
        type="submit"
        className="w-full bg-indigo-600 text-white p-2 rounded-lg font-medium shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:cursor-pointer"
      >
        {loding ? <ButtonSpinner /> : 'Sign In'}
      </button>
      <div className="flex items-center gap-2 text-sm text-gray-500 pt-3">
        <span className="flex-1 border-t border-gray-200"></span>
        <span className="px-2">or continue with</span>
        <span className="flex-1 border-t border-gray-200"></span>
      </div>
      <div className="grid grid-cols-2 gap-3 pt-3">
        <button
          type="button"
          className="flex items-center justify-center py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 "
        >
          Google
        </button>
        {/*        <button
          type="button"
          className="flex items-center justify-center py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 "
        >
          GitHub
        </button> */}
      </div>
    </form>
  );
};

export default LoginForm;
