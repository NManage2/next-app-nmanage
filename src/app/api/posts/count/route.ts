import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/utils/lib/prisma';

/**
 * @method GET
 * @route ~/api/posts/count
 * @desc GET posts count
 * @access public
 */
export const GET = async (request: NextRequest) => {
  try {
    const count = await prisma.post.count();
    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
};
