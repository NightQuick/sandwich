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

  const { accessToken, refreshToken } = generateJWT(user);
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
    path: '/',
  });
  res.json({ accessToken, user: { email: user.email } });
}

export async function refreshSession(req: Request, res: Response) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ error: 'Нет refresh токена' });

  try {
    // просто проверяем подпись и exp — в БД не лезем
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as JwtPayload;
    const newAccessToken = generateAccessToken({ userId: payload.userId, email: payload.email });
    res.json({ accessToken: newAccessToken, user: { email: payload.email } });
  } catch {
    res.status(401).json({ error: 'Невалидный refresh токен' });
  }
}

export async function register(req: Request, res: Response) {
  const { email, password } = req.body;
  const db = getDB();
  const user = await db.collection<UserDocument>('users').findOne({ email });
  if (user) return res.status(401).json({ error: 'Пользователь с таким именем уже существует' });
  else {
    const passwordHash = await bcrypt.hash(password, 10);
    const result = await db.collection('users').insertOne({ email, passwordHash });

    const newUser = { _id: result.insertedId, email, passwordHash };
    const { accessToken, refreshToken } = generateJWT(newUser);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
      path: '/',
    });
    res.json({ accessToken, user: { email: newUser.email } });
  }
}
export async function logout(req: Request, res: Response) {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
    path: '/',
  });
  res.status(204).send();
}
