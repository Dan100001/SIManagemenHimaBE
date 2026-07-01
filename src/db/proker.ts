import { date, int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const proker = mysqlTable('proker', {
  id: int('id').autoincrement().primaryKey(),
  nama: varchar('nama', { length: 120 }).notNull(),
  deskripsi: varchar('deskripsi', { length: 255 }).notNull(),
  lokasi: varchar('lokasi', { length: 120 }).notNull(),
  tanggal: date('tanggal').notNull()
});