import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

interface JwtPayload {
  userId: string;
  email: string;
}

function generateAccessToken(payload: JwtPayload): string {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: '15m', // короткий срок жизни
  });
}

function generateRefreshToken(payload: JwtPayload): string {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: '7d', // долгий срок жизни
  });
}

function generateJWT(user: { _id: ObjectId; email: string }) {
  const payload: JwtPayload = {
    userId: user._id.toString(),
    email: user.email,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  return { accessToken, refreshToken };
}

export { generateJWT, generateAccessToken, generateRefreshToken, JwtPayload };
