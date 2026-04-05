import Link from 'next/link';

const Navbar = () => {
  return (
    <>
      <nav className="hidden md:flex items-center space-x-8">
        <Link
          className="text-gray-700 hover:text-blue-600 transition-colors capitalize"
          href={'/about'}
        >
          About
        </Link>
        <Link
          className="text-gray-700 hover:text-blue-600 transition-colors capitalize"
          href={'/posts?pageNumber=1'}
        >
          posts
        </Link>
        <Link
          className="text-gray-700 hover:text-blue-600 transition-colors capitalize"
          href={'/contact'}
        >
          Contact
        </Link>
        <Link
          className="text-gray-700 hover:text-blue-600 transition-colors capitalize"
          href={'/admin'}
        >
          Admin
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
