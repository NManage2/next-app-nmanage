import { ILoginUserDto } from '@/utils/dto';
import { setCookie } from '@/utils/generateToken';
import { prisma } from '@/utils/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';

export const POST = async (request: NextRequest) => {
  // try {
  const body = (await request.json()) as ILoginUserDto;
  const loginUserValidation = z.object({
    email: z.string().min(2).max(200).email(),
    password: z.string().min(6),
  });

  const validation = loginUserValidation.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { message: validation.error.issues[0].message },
      { status: 200 },
    );
  }

  const user = await prisma.user.findUnique({ where: { email: body.email } });
  if (!user) {
    return NextResponse.json(
      {
        message: "You don't have an account, Please Create an account first!",
      },
      { status: 400 },
    );
  }

  const isPasswordMatch = await bcrypt.compare(body.password, user.password);
  if (!isPasswordMatch) {
    return NextResponse.json(
      { message: 'Invalid Password or Email!' },
      { status: 400 },
    );
  }

  const cookie = setCookie({
    id: user.id,
    username: user.username,
    isAdmin: user.isAdmin,
  });
  return NextResponse.json(
    { message: 'Authenticated' },
    { status: 200, headers: { 'Set-Cookie': cookie } },
  );
  //  } catch (error) {
  //  return NextResponse.json(
  //  { message: 'Internal Server Error!' },
  //  { status: 500 },
  //   );
  //  }
};
