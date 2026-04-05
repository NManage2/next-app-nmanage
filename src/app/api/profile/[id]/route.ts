import { prisma } from '@/utils/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/utils/verifyToken';
import { IUpdateUserDTO } from '@/utils/dto';
import bcrypt from 'bcryptjs';
import { updateUserSchema } from '@/utils/validation';
interface IProps {
  params: Promise<{ id: string }>; // Doit être une Promise dans Next.js 15+
}
/**
 * @method DELETE
 * @route ~/api/PROFILE/:id
 * @desc delete profile
 * @access private
 */
export const DELETE = async (request: NextRequest, { params }: IProps) => {
  try {
    const { id } = await params;
    const userId = parseInt(id);

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const userToken = verifyToken(request);
    if (
      (userToken !== null && userToken.id === user.id) ||
      userToken?.isAdmin
    ) {
      await prisma.user.delete({ where: { id: userId } });
      return NextResponse.json(
        { message: 'User deleted Successfully' },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { message: 'You are not authorized to delete this user!' },
      { status: 403 },
    );
  } catch (error) {
    return NextResponse.json(
      { messgae: 'Internal Server Error' },
      { status: 500 },
    );
  }
};

//GET
/**
 * @method GET
 * @route ~/api/PROFILE/:id
 * @desc GET profile
 * @access private
 */
export const GET = async (request: NextRequest, { params }: IProps) => {
  try {
    const { id } = await params;
    const userId = parseInt(id);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        updatedAt: true,
        isAdmin: true,
      },
    });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const userToken = verifyToken(request);
    if (
      (userToken !== null && userToken.id === user.id) ||
      userToken?.isAdmin
    ) {
      return NextResponse.json(user, { status: 200 });
    }

    return NextResponse.json(
      { message: 'You are not authorized access denided!' },
      { status: 403 },
    );
  } catch (error) {
    return NextResponse.json(
      { messgae: 'Internal Server Error' },
      { status: 500 },
    );
  }
};

//PUT
/**
 * @method PUT
 * @route ~/api/PROFILE/:id
 * @desc Update profile
 * @access private
 */
export async function PUT(request: NextRequest, { params }: IProps) {
  try {
    const { id } = await params;
    const userId = parseInt(id);

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const userToken = verifyToken(request);
    if (
      (userToken !== null && userToken.id === user.id) ||
      userToken?.isAdmin
    ) {
      const body = (await request.json()) as IUpdateUserDTO;
      const validation = updateUserSchema.safeParse(body);

      if (!validation.success) {
        return NextResponse.json(
          { message: validation.error.issues[0].message },
          { status: 400 },
        );
      }

      let hashedPassword = user.password;
      if (body.password) {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(body.password, salt);
      }
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          username: body.username,
          email: body.email,
          password: hashedPassword,
        },
      });
      const { password, ...other } = updatedUser;
      return NextResponse.json({ ...other }, { status: 200 });
    }

    return NextResponse.json(
      { message: 'You are not authorized access denied!' },
      { status: 403 },
    );
  } catch (error) {
    return NextResponse.json(
      { messgae: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
