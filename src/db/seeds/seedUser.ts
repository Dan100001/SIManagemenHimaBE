import { db } from "../index.js";
import { user } from "../user.js";

async function seedUser() {
  await db.insert(user as any).values([
    {
      nama: "Administrator",
      email: "admin@gmail.com",
      password: "123456",
      divisiId: 1,
      role: "Admin"
    },
    {
      nama: "aura",
      email: "aura@gmail.com",
      password: "123344",
      divisiId: 1,
      role: "Anggota Inti"
    },
    {
      nama: "dan",
      email: "dan@gmail.com",
      password: "223344",
      divisiId: 1,
      role: "Anggota Inti"
    },
  ]);

  console.log("✅ Seed user berhasil");
}

seedUser()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Seeder gagal:', error);
    process.exit(1);
  });