'use client';
import { useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import { MdClose } from 'react-icons/md';
import Link from 'next/link';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="md:hidden" onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? (
          <MdClose className="w-6 h-6" />
        ) : (
          <IoMenu className="w-6 h-6" />
        )}
      </button>

      {isOpen && (
        <nav className="md:hidden flex items-center flex-col mt-4 pb-4 space-y-3">
          <Link
            className="text-gray-700 hover:text-blue-600 transition-colors"
            href="/about"
          >
            About
          </Link>
          <Link
            className="text-gray-700 hover:text-blue-600 transition-colors"
            href="/posts"
          >
            Posts
          </Link>
          <Link
            className="text-gray-700 hover:text-blue-600 transition-colors"
            href="/contact"
          >
            Contact
          </Link>
        </nav>
      )}
    </>
  );
}
