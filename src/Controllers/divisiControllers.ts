import type {
  Request,
  Response,
  NextFunction
} from "express";

import {
  asc,
  desc,
  like,
  count,
  eq
} from "drizzle-orm";

import { db } from '../db/index.js';
import { divisi } from '../db/divisi.js';


// CREATE
export async function createDivisi(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {

    const { nama, deskripsi} = req.body;

    if (!nama) {
      return next({
        statusCode: 400,
        message: "nama wajib diisi"
      });
    }

    const insertResult = await db
      .insert(divisi as any)
      .values({
        nama,
        deskripsi
      });

    const insertedId = Number(insertResult[0].insertId);

    const result = await db
      .select({
        id: divisi.id,
        nama: divisi.nama,
        deskripsi: divisi.deskripsi
      })
      .from(divisi)
      .where(eq(divisi.id, insertedId))
      .limit(1);

    return res.status(201).json(result[0]);

  } catch (err) {
    return next(err);
  }
}


// GET ALL
export async function getAllDivisi(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {

    const page = Number(req.query.page ?? 1);

    const limit = Number(req.query.limit ?? 10);

    const keyword = String(req.query.q ?? "");

    const sortDir = String(
      req.query.sortDir ?? "asc"
    ).toLowerCase();

    const conditions = keyword
      ? like(divisi.nama, `%${keyword}%`)
      : undefined;

    const rows = await db
      .select({
        id: divisi.id,
        nama: divisi.nama,
        deskripsi: divisi.deskripsi
      })
      .from(divisi)
      .where(conditions)
      .orderBy(
        sortDir === "desc"
          ? desc(divisi.nama)
          : asc(divisi.nama)
      )
      .limit(limit)
      .offset((page - 1) * limit);

    const totalResult = await db
      .select({
        total: count()
      })
      .from(divisi)
      .where(conditions);

    const total = totalResult[0]?.total ?? 0;

    return res.json({
      rows,
      count: total,
      page,
      limit
    });

  } catch (err) {
    return next(err);
  }
}


// GET BY ID
export async function getDivisiById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {

    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return next({
        statusCode: 400,
        message: "id harus berupa angka"
      });
    }

    const result = await db
      .select({
        id: divisi.id,
        nama: divisi.nama,
        deskripsi: divisi.deskripsi
      })
      .from(divisi)
      .where(eq(divisi.id, id))
      .limit(1);

    if (!result[0]) {
      return next({
        statusCode: 404,
        message: "Divisi tidak ditemukan"
      });
    }

    return res.json(result[0]);

  } catch (err) {
    return next(err);
  }
}


// UPDATE
export async function updateDivisi(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {

    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return next({
        statusCode: 400,
        message: "id harus berupa angka"
      });
    }

    const { nama, deskripsi } = req.body;

    if (!nama) {
      return next({
        statusCode: 400,
        message: "nama wajib diisi"
      });
    }

    const existing = await db
      .select()
      .from(divisi)
      .where(eq(divisi.id, id))
      .limit(1);

    if (!existing[0]) {
      return next({
        statusCode: 404,
        message: "Divisi tidak ditemukan"
      });
    }

    await db
      .update(divisi as any)
      .set({
        nama,
        deskripsi
      })
      .where(eq(divisi.id, id));

    const updated = await db
      .select({
        id: divisi.id,
        nama: divisi.nama,
        deskripsi: divisi.deskripsi
      })
      .from(divisi)
      .where(eq(divisi.id, id))
      .limit(1);

    return res.json(updated[0]);

  } catch (err) {
    return next(err);
  }
}


// DELETE
export async function deleteDivisi(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {

    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return next({
        statusCode: 400,
        message: "id harus berupa angka"
      });
    }

    const existing = await db
      .select()
      .from(divisi)
      .where(eq(divisi.id, id))
      .limit(1);

    if (!existing[0]) {
      return next({
        statusCode: 404,
        message: "Divisi tidak ditemukan"
      });
    }

    await db
      .delete(divisi)
      .where(eq(divisi.id, id));

    return res.json({
      message: "Divisi berhasil dihapus"
    });

  } catch (err) {
    return next(err);
  }
}