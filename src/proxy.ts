import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const jwtToken = request.cookies.get('jwtToken');
  const token = jwtToken?.value as string;
  console.log(request.nextUrl.pathname);
  if (!token) {
    if (request.nextUrl.pathname.startsWith('api/profile/')) {
      return NextResponse.json(
        { message: 'No token provided, mmessage from middleware' },
        { status: 401 },
      );
    }
  } else {
    if (
      request.nextUrl.pathname === '/login' ||
      request.nextUrl.pathname === '/register'
    ) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
}
export const config = {
  matcher: ['/api/profile/:path*', '/login', '/register'],
};
