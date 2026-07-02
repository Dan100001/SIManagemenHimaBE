import type { Request, Response, NextFunction } from 'express';
import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { anggota } from '../db/anggota.js';

function isValidEmail(email: string) {
  return /^\S+@\S+\.\S+$/.test(email);
}

// GET ALL
export async function getAll(_req: Request, res: Response, next: NextFunction) {
  try {
    const data = await db.select().from(anggota);
    return res.json(data);
  } catch (error) {
    return next(error);
  }
}

// GET BY ID
export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: 'id harus berupa angka',
      });
    }

    const data = await db
      .select()
      .from(anggota)
      .where(eq(anggota.id, id))
      .limit(1);

    if (!data[0]) {
      return res.status(404).json({
        message: 'Anggota tidak ditemukan',
      });
    }

    return res.json(data[0]);
  } catch (error) {
    return next(error);
  }
}

// CREATE
export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { nama, noHp, alamat, email } = req.body;

    if (!nama || !noHp || !alamat || !email) {
      return res.status(400).json({
        message: 'nama, noHp, alamat, email wajib diisi',
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        message: 'format email tidak valid',
      });
    }

    await db.insert(anggota as any).values({
      nama,
      noHp,
      alamat,
      email,
    });

    const created = await db
      .select()
      .from(anggota)
      .where(eq(anggota.email, email))
      .limit(1);

    return res.status(201).json(created[0]);
  } catch (error) {
    return next(error);
  }
}

// UPDATE
export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: 'id harus berupa angka',
      });
    }

    const { nama, noHp, alamat, email } = req.body;

    if (!nama || !noHp || !alamat || !email) {
      return res.status(400).json({
        message: 'nama, noHp, alamat, email wajib diisi',
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        message: 'format email tidak valid',
      });
    }

    const existing = await db
      .select()
      .from(anggota)
      .where(eq(anggota.id, id))
      .limit(1);

    if (!existing[0]) {
      return res.status(404).json({
        message: 'Anggota tidak ditemukan',
      });
    }

    await db
      .update(anggota as any)
      .set({
        nama,
        noHp,
        alamat,
        email,
      })
      .where(eq(anggota.id, id));

    const updated = await db
      .select()
      .from(anggota)
      .where(eq(anggota.id, id))
      .limit(1);

    return res.json(updated[0]);
  } catch (error) {
    return next(error);
  }
}

// DELETE
export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: 'id harus berupa angka',
      });
    }

    const existing = await db
      .select()
      .from(anggota)
      .where(eq(anggota.id, id))
      .limit(1);

    if (!existing[0]) {
      return res.status(404).json({
        message: 'Anggota tidak ditemukan',
      });
    }

    await db.delete(anggota).where(eq(anggota.id, id));

    return res.json({
      message: 'Anggota berhasil dihapus',
    });
  } catch (error) {
    return next(error);
  }
}