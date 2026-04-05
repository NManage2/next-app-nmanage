import { prisma } from '@/utils/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/utils/verifyToken';
import { ICreateCommentDTO } from '@/utils/dto';
import { createCommentSchema } from '@/utils/validation';
export const POST = async (request: NextRequest) => {
  try {
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { message: 'No user, acces denided!' },
        { status: 401 },
      );
    }
    const body = (await request.json()) as ICreateCommentDTO;
    console.log("BODY REÇU PAR L'API :", body); // <--- REGARDE TON TERMINAL VS CODE
    const validation = createCommentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 },
      );
    }
    const newComment = await prisma.comment.create({
      data: {
        text: body.text,
        postId: body.postId,
        userId: user.id,
      },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'internal server error' },
      { status: 500 },
    );
  }
};

/**
 * @method GET
 * @route ~/api/comments
 * @desc get all commentq
 * @access PRIVATE ONLY Admin
 */
export async function GET(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user || !user.isAdmin) {
      return NextResponse.json(
        { message: 'only Admin, acces denided!' },
        { status: 403 },
      );
    }
    const comments = await prisma.comment.findMany({
      include: {
        user: {
          select: { username: true, email: true }, // Ne pas exposer le mot de passe
        },
      },
      orderBy: { updatedAt: 'desc' }, // Les plus récents en premier
    });
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'internal server error' },
      { status: 500 },
    );
  }
}
