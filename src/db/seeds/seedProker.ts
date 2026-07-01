import { db } from '../index.js';
import { proker } from '../schema.js';

async function seedProker() {
  await db.insert(proker as any).values([
    {
      nama_proker: 'Seminar Teknologi',
      divisi: 'Pendidikan',
      tanggal_mulai: '2026-07-15',
      tanggal_selesai: '2026-07-15',
      status: 'Aktif'
    }
  ]);

  console.log('Seeder proker selesai dijalankan');
}

seedProker()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Seeder gagal:', error);
    process.exit(1);
  });