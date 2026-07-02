import { relations } from "drizzle-orm";
import {
  mysqlTable,
  int,
  varchar,
  mysqlEnum,
} from "drizzle-orm/mysql-core";

import { divisi } from "./divisi.js";

export const user = mysqlTable("user", {
  id: int("id").autoincrement().primaryKey(),

  nama: varchar("nama", {
    length: 100,
  }).notNull(),

  email: varchar("email", {
    length: 100,
  }).notNull(),

  password: varchar("password", {
    length: 255,
  }).notNull(),

  divisiId: int("divisi_id")
    .references(() => divisi.id),

  role: mysqlEnum('role', ['Admin', 'Anggota Inti']).default('Anggota Inti').notNull(),
});


export const userRelations = relations(user, ({ one }) => ({
  divisi: one(divisi, {
    fields: [user.divisiId],
    references: [divisi.id],
  }),
}));