import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import * as  user  from './user.js';
import * as  divisi  from './divisi.js';
import * as  anggota  from './anggota.js';
import * as  proker  from './proker.js';


const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'apk_himpunanmhs',
  connectionLimit: 10
});

const schema = {
  ...user,
  ...anggota,
  ...proker, 
  ...divisi
};

export const db = drizzle(pool, { schema, mode: 'default' });