import { Request, Response } from 'express';
import { getDB } from '../db.js';
import bcrypt from 'bcryptjs';
import { generateAccessToken, generateJWT, JwtPayload } from '../services/jwt.service.js';
import { UserDocument } from '../types/user.js';
import jwt from 'jsonwebtoken';

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;
  const db = getDB();
  const user = await db.collection<UserDocument>('users').findOne({ email });
  if (!user) return res.status(401).json({ error: 'Неверный логин или пароль' });

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) return res.status(401).json({ error: 'Неверный логин или пароль' });

  return generateJWT(user);
}

export async function refreshSession(req: Request, res: Response) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ error: 'Нет refresh токена' });

  try {
    // просто проверяем подпись и exp — в БД не лезем
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as JwtPayload;
    const newAccessToken = generateAccessToken({ userId: payload.userId, email: payload.email });
    res.json({ accessToken: newAccessToken });
  } catch {
    res.status(401).json({ error: 'Невалидный refresh токен' });
  }
}
