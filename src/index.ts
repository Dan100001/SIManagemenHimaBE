import express from 'express';
import { sql } from 'drizzle-orm';
import prokerRoutes from './routes/prokerRoutes.js';
import userRoutes from './routes/userRoutes.js';
import divisiRoutes from './routes/divisiRoutes.js';
import anggotaRoutes from './routes/anggotaRoutes.js';
import { db } from './db/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
// import cors from 'cors';

const app = express();

app.use(express.json());
// app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/health', async (_req, res) => {
  try {
    await db.execute(sql`SELECT 1`);
    return res.json({ status: 'ok' });
  } catch {
    return res.status(500).json({ status: 'error' });
  }
});

app.use('/user', userRoutes);
app.use('/anggota', anggotaRoutes);
app.use('/divisi', divisiRoutes);
app.use('/proker', prokerRoutes);
app.use('/auth', authRoutes);

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});