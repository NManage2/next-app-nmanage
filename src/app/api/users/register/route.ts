import { NextRequest, NextResponse } from 'next/server';
import { IRegisterUserDto } from '@/utils/dto';
import { setCookie } from '@/utils/generateToken';
import { prisma } from '@/utils/lib/prisma';
import z from 'zod';
import bcrypt from 'bcryptjs';
export const POST = async (request: NextRequest) => {
  try {
    const body = (await request.json()) as IRegisterUserDto;
    const createNewUserSchema = z.object({
      username: z.string().min(5).max(15),
      email: z.string().min(2).max(200).email(),
      password: z.string().min(6),
    });

    const validation = createNewUserSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({ where: { email: body.email } });

    if (user) {
      return NextResponse.json(
        { message: 'This user is already existed' },
        { status: 400 },
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(body.password, salt);

    const newUserData = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: hasedPassword,
      },
      select: {
        id: true,
        username: true,
        email: true,
        isAdmin: true,
      },
    });

    const cookie = setCookie({
      id: newUserData.id,
      username: newUserData.username,
      isAdmin: newUserData.isAdmin,
    });
    return NextResponse.json(
      { ...newUserData, message: 'Registred & Authenticated' },
      { status: 201, headers: { 'Set-Cookie': cookie } },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
};
