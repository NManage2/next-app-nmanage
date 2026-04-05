import { IUpdatePostDTO } from '@/utils/dto';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/utils/lib/prisma';
import { verifyToken } from '@/utils/verifyToken';
interface ISinglePostProps {
  params: Promise<{ id: string }>;
}
// GET single post
export const GET = async (
  request: NextRequest,
  { params }: ISinglePostProps,
) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt((await params).id) },
      include: {
        comments: {
          include: { user: { select: { username: true } } },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    // const post = posts.find((p) => p.id === parseInt(id));
    // Si le post n'existe pas, on renvoie une erreur 404
    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }
    // Succès
    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
};

//update

export const PUT = async (
  request: NextRequest,
  { params }: ISinglePostProps,
) => {
  try {
    const user = verifyToken(request);
    if (user !== null && user.isAdmin === true) {
      const post = await prisma.post.findUnique({
        where: { id: parseInt((await params).id) },
      });

      const data = (await request.json()) as IUpdatePostDTO;
      // Si le post n'existe pas, on renvoie une erreur 404
      if (!post) {
        return NextResponse.json(
          { message: 'Post non trouvé' },
          { status: 404 },
        );
      }
      // Succès
      const updatePost = await prisma.post.update({
        where: { id: parseInt((await params).id) },
        data: {
          title: data.title,
          content: data.content,
        },
      });

      return NextResponse.json(updatePost, { status: 200 });
    }
    return NextResponse.json(
      { message: 'No user, acces denided!' },
      { status: 401 },
    );
  } catch (error) {
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
};

// delete

export const DELETE = async (
  request: NextRequest,
  { params }: ISinglePostProps,
) => {
  try {
    const user = verifyToken(request);
    if (user !== null && user.isAdmin === true) {
      const post = await prisma.post.findUnique({
        where: { id: parseInt((await params).id) },
        include: { comments: true },
      });
      // Si le post n'existe pas, on renvoie une erreur 404
      if (!post) {
        return NextResponse.json(
          { message: 'Post non trouvé' },
          { status: 404 },
        );
      }
      // Succès
      const deletePost = await prisma.post.delete({
        where: { id: parseInt((await params).id) },
      });
      // cascade delete dans le shema suffit
      // const commentIds = post?.comments.map((Comment) => Comment.id);
      // await prisma.comment.deleteMany({ where: { id: { in: commentIds } } });

      return NextResponse.json({ message: 'post deleted' }, { status: 200 });
    }
    return NextResponse.json(
      { message: 'No user, acces denided!' },
      { status: 401 },
    );
  } catch (error) {
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
};
