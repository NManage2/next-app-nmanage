import { posts } from '@/utils/data';
import { IUpdatePostDTO } from '@/utils/dto';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { prisma } from '@/utils/lib/prisma';
import { verifyToken } from '@/utils/verifyToken';
import { Content } from 'next/font/google';
interface ISinglePostProps {
  params: Promise<{ id: string }>;
}

/**
 * @method GET
 * @route ~/api/posts/search
 * @desc GET search
 * @access public
 */
export const GET = async (request: NextRequest) => {
  try {
    const searchtext = request.nextUrl.searchParams.get('searchText');
    let articles;
    if (searchtext) {
      articles = await prisma.post.findMany({
        where: {
          OR: [
            { title: { startsWith: searchtext, mode: 'insensitive' } },
            { content: { contains: searchtext, mode: 'insensitive' } },
          ],
        },
      });
    } else {
      articles = await prisma.post.findMany({
        take: 6,
      });
    }

    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
};
