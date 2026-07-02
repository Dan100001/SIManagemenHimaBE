import { db } from '../index.js';
import { anggota } from '../anggota.js';

async function seedAnggota() {
  await db.insert(anggota as any).values([
    {
      nama: 'Aura Illa Sari',
      npm: '2014520003',
      email: 'aura@example.com',
      password: 'aura123',
      prokerId: '1'
    },
    {
      nama: 'Ahmad Hamdani',
      npm: '2014520004',
      email: 'dan@example.com',
      password: 'dan123',
      prokerId: '1'
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