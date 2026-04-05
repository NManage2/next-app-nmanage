'use client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import { DOMAIN } from '@/utils/constants';

const LogoutButton = () => {
  const router = useRouter();
  const logoutHandler = async () => {
    try {
      await axios.get(`${DOMAIN}/api/users/logout`);
      router.push('/');
      router.refresh();
    } catch (error) {
      toast.warning('something went wrong');
    }
  };

  return (
    <button
      onClick={logoutHandler}
      className="bg-gray-700 text-gray-100 px-1 rounded px-2 mx-2"
    >
      Lougout
    </button>
  );
};

export default LogoutButton;
