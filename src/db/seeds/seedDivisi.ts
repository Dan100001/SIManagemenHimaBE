import { db } from "../index.js";
import { divisi } from "../divisi.js";

async function seedDivisi() {
  await db.insert(divisi as any).values([
    {
      nama: "Hubungan Masyarakat",
      deskripsi: "Mengelola komunikasi antara himpunan dan masyarakat"
    }
  ]);

  console.log("✅ Seed Divisi berhasil");
}

seedDivisi()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Seeder gagal:', error);
    process.exit(1);
  });