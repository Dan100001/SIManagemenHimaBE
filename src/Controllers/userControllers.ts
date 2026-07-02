import type {
  Request,
  Response,
  NextFunction,
} from "express";

import bcrypt from "bcrypt";

import {
  asc,
  desc,
  like,
  count,
  eq,
} from "drizzle-orm";

import { db } from "../db/index.js";
import { user } from "../db/user.js";

// =====================
// GET ALL
// =====================
export async function getAllUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);
    const q = String(req.query.q ?? "");
    const sortDir = String(req.query.sortDir ?? "asc").toLowerCase();

    const conditions = q
      ? like(user.nama, `%${q}%`)
      : undefined;

    const rows = await db
      .select({
        id: user.id,
        nama: user.nama,
        email: user.email,
        divisiId: user.divisiId,
        role: user.role,
      })
      .from(user)
      .where(conditions)
      .orderBy(
        sortDir === "desc"
          ? desc(user.nama)
          : asc(user.nama)
      )
      .limit(limit)
      .offset((page - 1) * limit);

    const totalResult = await db
      .select({
        total: count(),
      })
      .from(user)
      .where(conditions);

    return res.json({
      rows,
      count: totalResult[0]?.total ?? 0,
      page,
      limit,
    });
  } catch (err) {
    return next(err);
  }
}

// =====================
// GET BY ID
// =====================
export async function getUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    const data = await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.id, id),
    });

    if (!data) {
      return res.status(404).json({
        message: "User tidak ditemukan",
      });
    }

    return res.json(data);
  } catch (err) {
    return next(err);
  }
}

// =====================
// CREATE
// =====================
export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      nama,
      email,
      password,
      divisiId,
      role,
    } = req.body;

    if (!nama || !email || !password || !role) {
      return res.status(400).json({
        message: "Data belum lengkap",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.insert(user).values({
      nama,
      email,
      password: hashedPassword,
      divisiId,
      role,
    });

    return res.status(201).json({
      message: "User berhasil ditambahkan",
      id: Number(result[0].insertId),
    });
  } catch (err) {
    return next(err);
  }
}

// =====================
// UPDATE
// =====================
export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    const {
      nama,
      email,
      password,
      divisiId,
      role,
    } = req.body;

    const existing = await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.id, id),
    });

    if (!existing) {
      return res.status(404).json({
        message: "User tidak ditemukan",
      });
    }

    const data: any = {
      nama,
      email,
      divisiId,
      role,
    };

    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }

    await db
      .update(user)
      .set(data)
      .where(eq(user.id, id));

    return res.json({
      message: "User berhasil diupdate",
    });
  } catch (err) {
    return next(err);
  }
}

// =====================
// DELETE
// =====================
export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    const existing = await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.id, id),
    });

    if (!existing) {
      return res.status(404).json({
        message: "User tidak ditemukan",
      });
    }

    await db
      .delete(user)
      .where(eq(user.id, id));

    return res.json({
      message: "User berhasil dihapus",
    });
  } catch (err) {
    return next(err);
  }
}