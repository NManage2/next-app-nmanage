import Link from 'next/link';
import Navbar from '../Navbar/Navbar';
import { cookies } from 'next/headers';
import MobileNav from './MobileMenu';
import { verifyTokenForPage } from '@/utils/verifyToken';
import LogoutButton from './LogoutButton';

const Header = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('jwtToken')?.value || '';
  const payload = verifyTokenForPage(token);
  return (
    <>
      <header className="fixed top-0 bg-white/95 w-full backdrop-blur-sm shadow-sm z-50 ">
        <div className="container mx-auto px-4 py-4 ">
          <div className="flex items-center justify-between">
            <Link href="/">
              <span className="text-xl font-bold text-gray-600">
                NEW-MANAGE..
              </span>
            </Link>
            <Navbar />
            {/* Le bouton et le menu mobile sont ici */}
            <MobileNav />
            {payload ? (
              <div>
                <strong className="text-blue-800 md:text-sm capitalize" pr-4>
                  {payload.username}
                </strong>
                <LogoutButton />
              </div>
            ) : (
              <>
                {' '}
                <div className="flex items-center space-x-4  text-sm">
                  <button className="px-2 py-1 bg-blue-600 hover:bg-blue-800 text-white rounded-md">
                    <Link href={'/login'}>Login</Link>
                  </button>
                  <button className="px-2 py-1 bg-blue-600 hover:bg-blue-800 text-white rounded-md">
                    <Link href={'/register'}>Register</Link>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
