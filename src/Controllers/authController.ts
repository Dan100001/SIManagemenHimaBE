import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';

import { db } from '../db/index.js';
import { user } from '../db/user.js';

const SECRET_KEY = 'RAHASIA_NEGARA';

interface JwtPayload {
  id: number;
  email: string;
}

export const register = async (req: Request, res: Response) => {
  try {
    const { nama, npm, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(user as any).values({
      nama,
      npm,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: 'Register berhasil'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Gagal register',
      error
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await db
      .select()
      .from(user)
      .where(eq(user.email, email))
      .limit(1);

    const person = result[0];

    if (!person) {
      return res.status(401).json({
        message: 'Email tidak ditemukan'
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      person.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: 'Password salah'
      });
    }

    const payload: JwtPayload = {
      id: person.id,
      email: person.email
    };

    const token = jwt.sign(
      payload,
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({
      token
    });
  } catch (error) {
    res.status(500).json({
      message: 'Gagal login',
      error
    });
  }
};