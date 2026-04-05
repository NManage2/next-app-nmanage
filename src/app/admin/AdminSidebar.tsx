import Link from 'next/link';
import { ReactNode } from 'react';
import { CgClose } from 'react-icons/cg';
import { DiVim } from 'react-icons/di';
import { FaComment } from 'react-icons/fa';
import { IoIosHome } from 'react-icons/io';
import { PiNewspaper } from 'react-icons/pi';

interface INavItem {
  path: string;
  label: string;
  icon: ReactNode;
}
interface IAdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}
const AdminSidebar = ({ isOpen, onClose }: IAdminSidebarProps) => {
  const navLinks: INavItem[] = [
    { path: '/admin', label: 'Dashboard', icon: <IoIosHome /> },
    {
      path: '/admin/posts-table?PageNumber=1',
      label: 'Posts',
      icon: <PiNewspaper />,
    },
    { path: '/admin/comments-table', label: 'Comments', icon: <FaComment /> },
  ];

  return (
    <>
      {/* ouverlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={onClose}
        />
      )}
      {/*aside*/}
      <aside
        className={`fixed left-0 top-14 md:top-auto h-screen w-64 bg-linear-to-b from bg-slate-900 to-slate-800 border-r border-slate-700 shadow-lg transform transition-transform duration-300 ease ease-in-out z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <button
          onClick={onClose}
          className="absolute top-8 right-4 md:hidden text-slate-200 hover:text-white text-2xl cursor-poxinter"
        >
          <CgClose />
        </button>
        <div className="flex items-center justify-center h-20 border-b border-slate-700">
          <h1 className="text-2xl font-bold text-white">Admin</h1>
        </div>
        <nav className="flex-1 px-4 py-8 space-y2">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.path}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-200 hover:bg-slate-700 hover:text-white transition-all duration-200 group"
            >
              <span className="text-xl group-hover:scale-110 transition-transform">
                {link.icon}
              </span>
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
        </nav>
        <div className="border-t border-slate-700 p-4">
          <button className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200 cursor-pointer">
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
