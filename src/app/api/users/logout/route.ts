import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @method get
 * @route ~/api/users/logout
 * @desc Logout User
 * @access public
 */
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('jwtToken');

    return NextResponse.json({ message: 'logout' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'internal server error' },
      { status: 500 },
    );
  }
}
