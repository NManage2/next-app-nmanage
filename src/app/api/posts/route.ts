import { ICreatePostDTO } from '@/utils/dto';
import { createPostSchema } from '@/utils/validation';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/utils/lib/prisma';
import { Post } from '@/generated/prisma/client';
import { POST_PER_PAGE } from '@/utils/constants';
import { verifyToken } from '@/utils/verifyToken';
/**
 * @method POST
 * @route ~/api/posts
 * @desc create new posts
 * @access private (only Admin)
 */
export const POST = async (request: NextRequest) => {
  try {
    const userToken = verifyToken(request);
    if (userToken !== null && userToken.isAdmin === true) {
      const body = (await request.json()) as ICreatePostDTO;
      const validation = createPostSchema.safeParse(body);
      if (!validation.success) {
        return NextResponse.json(
          { message: validation.error.issues[0].message },
          { status: 400 },
        );
      }
      // --- إضافة منطق تصفير العداد إذا كان الجدول فارغاً مثلاً ---
      const count = await prisma.post.count();
      if (count === 0) {
        // إعادة التعيين لضمان أن أول منشور يأخذ ID = 1
        // ملاحظة: جرب "post_id_seq" (حروف صغيرة) إذا لم ينجح "Post_id_seq"
        await prisma.$executeRawUnsafe(
          `ALTER SEQUENCE "Post_id_seq" RESTART WITH 1;`,
        );
      }
      const newPost: Post = await prisma.post.create({
        data: {
          title: body.title,
          content: body.content,
        },
      });

      return NextResponse.json(newPost, { status: 201 });
    }
    return NextResponse.json('only Admin! access denied', { status: 403 });
  } catch (error) {
    return NextResponse.json(
      { message: 'internal server error' },
      { status: 500 },
    );
  }
};

/**
 * @method GET
 * @route ~/api/posts
 * @desc GET posts by pageNumber
 * @access public
 */
export const GET = async (request: NextRequest) => {
  try {
    const pageNumber = request.nextUrl.searchParams.get('pageNumber') || '1';
    console.log(pageNumber);
    const posts = await prisma.post.findMany({
      skip: POST_PER_PAGE * (parseInt(pageNumber) - 1),
      take: POST_PER_PAGE,
      orderBy: { publishedAt: 'desc' },
    });
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'internal server error' },
      { status: 500 },
    );
  }
};
