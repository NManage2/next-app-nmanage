import { prisma } from '@/utils/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/utils/verifyToken';
import { IUpdateCommentDTO } from '@/utils/dto';
interface IProps {
  params: Promise<{ id: string }>; // Doit être une Promise dans Next.js 15+
}
/**
 * @method PUT
 * @route ~/api/comments/:id
 * @desc Update comment
 * @access PRIVATE ONLY owner
 */
export const PUT = async (request: NextRequest, { params }: IProps) => {
  try {
    const { id } = await params;
    const commentId = parseInt(id);
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });
    if (!comment) {
      return NextResponse.json(
        { message: 'Comment not found' },
        { status: 404 },
      );
    }

    const userToken = verifyToken(request);
    console.log(userToken?.id);
    console.log(comment.id);
    if (userToken !== null && userToken.id === comment.userId) {
      const body = (await request.json()) as IUpdateCommentDTO;
      const updatedComment = await prisma.comment.update({
        where: { id: commentId },
        data: {
          text: body.text,
        },
      });
      return NextResponse.json(updatedComment, { status: 200 });
    }
    return NextResponse.json(
      { message: 'only Admin, acces denied!' },
      { status: 403 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'internal server error' },
      { status: 500 },
    );
  }
};

/**
 * @method DELETE
 * @route ~/api/comments/:id
 * @desc Delete comment
 * @access PRIVATE  owner or Admin
 */
export const DELETE = async (request: NextRequest, { params }: IProps) => {
  try {
    const { id } = await params;
    const commentId = parseInt(id);
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });
    if (!comment) {
      return NextResponse.json(
        { message: 'Comment not found' },
        { status: 404 },
      );
    }

    const userToken = verifyToken(request);
    if (
      (userToken !== null && userToken.id === comment.id) ||
      userToken?.isAdmin
    ) {
      await prisma.comment.delete({ where: { id: commentId } });
      return NextResponse.json(
        { message: 'Comment deleted Successfully' },
        { status: 200 },
      );
    }
    return NextResponse.json(
      { message: 'only Admin, acces denied!' },
      { status: 403 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'internal server error' },
      { status: 500 },
    );
  }
};
