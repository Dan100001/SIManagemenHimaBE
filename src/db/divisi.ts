import {
  mysqlTable,
  int,
  varchar,
} from "drizzle-orm/mysql-core";

export const divisi = mysqlTable("divisi", {
  id: int("id").autoincrement().primaryKey(),

  nama: varchar("nama", {
    length: 100,
  }).notNull(),

  deskripsi: varchar("keterangan", {
    length: 255,
  }),
});