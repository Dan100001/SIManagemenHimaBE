import { db } from '../index.js';
import { anggota } from '../schema.js';

async function seedAnggota() {
  await db.insert(anggota as any).values([
    {
      nama: 'Aura Illa Sari',
      npm: '2014520003',
      email: 'aura@example.com',
      password: 'aura123'
    }
  ]);

  console.log('Seeder anggota selesai dijalankan');
}

seedAnggota()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Seeder gagal:', error);
    process.exit(1);
  });