import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { TUserPayload } from './types';

// verify token for api
export function verifyToken(request: NextRequest): TUserPayload | null {
  try {
    const jwtToken = request.cookies.get('jwtToken');
    console.log('jwtToken', jwtToken);
    const token = jwtToken?.value as string;
    if (!token) return null;
    const privateKey = process.env.JWT_SECRET as string;
    const userPayload = jwt.verify(token, privateKey) as TUserPayload;
    return userPayload;
  } catch (error) {
    return null;
  }
}

// verify token for page
export function verifyTokenForPage(token: string): TUserPayload | null {
  try {
    const privateKey = process.env.JWT_SECRET as string;
    const userPayload = jwt.verify(token, privateKey) as TUserPayload;
    if (!userPayload) return null;
    return userPayload;
  } catch (error) {
    return null;
  }
}
