import { db } from '../index.js';
import { proker } from '../proker.js';

async function seedProker() {
  await db.insert(proker as any).values([
    {
      nama: 'Seminar Teknologi',
      deskripsi: 'Pengertian tentang teknologi',
      lokasi: 'Lab Bersama',
      tanggal: '2026-07-15'
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