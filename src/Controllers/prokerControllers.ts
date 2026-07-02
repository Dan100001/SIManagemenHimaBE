import type { Request, Response, NextFunction } from 'express';
import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { proker } from '../db/proker.js';

// GET ALL
export async function getAll(_req: Request, res: Response, next: NextFunction) {
  try {
    const data = await db.select().from(proker);
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
      .from(proker)
      .where(eq(proker.id, id))
      .limit(1);

    if (!data[0]) {
      return res.status(404).json({
        message: 'Proker tidak ditemukan',
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
    const { nama, deskripsi, tanggal, lokasi } = req.body;

    if (!nama || !deskripsi || !tanggal || !lokasi) {
      return res.status(400).json({
        message: 'nama, deskripsi, tanggal, dan lokasi wajib diisi',
      });
    }

    await db.insert(proker).values({
      nama,
      deskripsi,
      tanggal,
      lokasi,
    });

    const created = await db
      .select()
      .from(proker)
      .where(eq(proker.nama, nama))
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

    const { nama, deskripsi, tanggal, lokasi } = req.body;

    if (!nama || !deskripsi || !tanggal || !lokasi) {
      return res.status(400).json({
        message: 'nama, deskripsi, tanggal, dan lokasi wajib diisi',
      });
    }

    const existing = await db
      .select()
      .from(proker)
      .where(eq(proker.id, id))
      .limit(1);

    if (!existing[0]) {
      return res.status(404).json({
        message: 'Proker tidak ditemukan',
      });
    }

    await db
      .update(proker)
      .set({
        nama,
        deskripsi,
        tanggal,
        lokasi,
      })
      .where(eq(proker.id, id));

    const updated = await db
      .select()
      .from(proker)
      .where(eq(proker.id, id))
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
      .from(proker)
      .where(eq(proker.id, id))
      .limit(1);

    if (!existing[0]) {
      return res.status(404).json({
        message: 'Proker tidak ditemukan',
      });
    }

    await db.delete(proker).where(eq(proker.id, id));

    return res.json({
      message: 'Proker berhasil dihapus',
    });
  } catch (error) {
    return next(error);
  }
}