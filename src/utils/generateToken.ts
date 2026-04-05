import jwt from 'jsonwebtoken';
import { TUserPayload } from './types';
import { serialize } from 'cookie';
export const generateToken = (userPayload: TUserPayload): string => {
  const token = jwt.sign(userPayload, process.env.JWT_SECRET!, {
    expiresIn: '4d',
  });
  return token;
};

export function setCookie(jwtPayload: TUserPayload): string {
  const token = generateToken(jwtPayload);
  const cookie = serialize('jwtToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });
  return cookie;
}
