import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
import { proker } from './proker.js';

export const anggota = mysqlTable('anggota', {
  id: int('id').autoincrement().primaryKey(),
  nama: varchar('nama', { length: 120 }).notNull(),
  npm: varchar('npm', { length: 20 }).notNull(),
  email: varchar('email', { length: 120 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),

  prokerId: int('proker_id')
    .notNull()
    .references(() => proker.id)
});

export const anggotaRelations = relations(anggota, ({ one }) => ({
  proker: one(proker, {
    fields: [anggota.prokerId],
    references: [proker.id]
  })
}));