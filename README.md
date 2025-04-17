# Dokumentasi LSP Aplikasi Absensi

## Memperkenalkan Hadirin, dibuat oleh Al Sakha

### Aplikasi absensi sederhana untuk sekolah

### Halaman Utama

User pertama kali datang ke website akan di tampilkan halaman utama.

![image.png](/public/image.png)

### Halaman Login

User harus login terlebih dahulu sebelum masuk ke halaman dashboard

![image.png](/public/image%201.png)

### Halaman Data Administrator

User bisa melihat tampilan semua total siswa yang hadir, terlambat, sakit, izin, dan alpha di hari ini/sekarang (Today).

Informasi: Data di ditampilkan berdasarkan hari ini/sekarang. Jika sudah berganti hari ke esok hari, data akan di reset menjadi 0.

![image.png](/public/image%202.png)

### Halaman Data Absensi

User bisa mengabsen siswa satu per satu secara realtime (Update tanggal dan status kehadiran langsung di hari ini) hanya dengan menekan salah satu tombol.

Tips: Jangan lupa untuk menekan tombol Update Tanggal tiap berganti hari dan sebelum absen para siswa satu per satu.

![image.png](/public/image%203.png)

### Halaman Data Siswa

User bisa menambahkan data siswa, mengubah data siswa, dan menghapus data siswa.

![image.png](/public/image%204.png)

## Flowchart

Maaf flowchart kurang niat 😅 (gk kek gini harusnya)

![image.png](/public/image%205.png)

## Tech Stack

- Typescript
- Next js
- Tanstack React Query
- Tailwindcss
- Shadcn UI
- Postgresql
- Prisma

## Tools

- VsCodium (Text Editor)
- Excalidraw (Gambar Flowchart)
- Supabase (Gambar ERD)
- Prisma studio (Table editor)
- Markdown (Format file dokumentasi)
- Notion (Aplikasi pencatat untuk membuat dokumentasi)

## Fitur

- Autentikasi (Login & Logout)
- Dashboard Analitik keseluruhan secara real time untuk halaman data administrator
- Create, Read, Update, Delete untuk halaman data siswa
- Tombol klik absensi siswa secara real time
- Pencarian data berdasarkan nama siswa
- Tombol Filter berdasarkan kelas
- Pagination
- Tema gelap dan terang
- Sudah responsive di berbagai device

## Visual Relasi Antar Table

![image.png](/public/image%206.png)

## Schema Prisma Model

```scheme
model User {
  id        String    @id @default(cuid()) @map("_id")
  name      String
  email     String    @unique
  image     String?
  role      String    @default("user")
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  sessions  Session[]
  accounts  Account[]
}

model Session {
  id        String   @id @default(cuid()) @map("_id")
  userId    String
  token     String
  expiresAt DateTime
  ipAddress String?
  userAgent String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Account {
  id                    String    @id @default(cuid()) @map("_id")
  userId                String
  accountId             String
  providerId            String
  accessToken           String?
  refreshToken          String?
  accessTokenExpiresAt  DateTime?
  refreshTokenExpiresAt DateTime?
  scope                 String?
  password              String?
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

enum GenderEnum {
  laki_laki
  perempuan
}

model Siswa {
  id_siswa  Int        @id @default(autoincrement())
  nis       Int
  nama      String
  kelasId   Int
  gender    GenderEnum
  kehadiran Kehadiran?

  kelas Kelas @relation(fields: [kelasId], references: [id_kelas])

  created_at DateTime @default(now())
}

model Kelas {
  id_kelas   Int     @id @default(autoincrement())
  nama_kelas String
  Siswa      Siswa[]
}

enum KehadiranEnum {
  hadir
  terlambat
  sakit
  izin
  alpha
}

model Kehadiran {
  id_kehadiran Int           @id @default(autoincrement())
  tanggal      DateTime      @default(now())
  kehadiran    KehadiranEnum @default(hadir)
  siswaId      Int           @unique
  Siswa        Siswa         @relation(fields: [siswaId], references: [id_siswa], onDelete: Cascade)

  created_at DateTime @default(now())
}
```

## Memulai projek

1. Git clone repo ini atau download zip

```markdown
git clone https://github.com/IRTIDEATH/Absensi-Sederhana.git
```

2. Buka text editor anda dan kita akan install package, buka terminal, lalu jalankan

```markdown
npm install
```

3. Jika sudah selesai menginstall, kita akan melakukan migrasi database ke local
4. Buka file .env.example, rename file menjadi .env
5. Masukkan database url anda

```markdown
DATABASE_URL="postgresql://postgres:[YOUR_PASSWORD]@localhost:[YOUR_PORT]/[YOUR_DB_NAME]?schema=public"
```

6. Buka terminal lalu jalankan

```markdown
npx prisma migrate dev
```

7. Projek sudah siap dijalankan dan dikembangkan
8. dev

```markdown
npm run dev
```

9. build

```markdown
npm run build
```

10. preview

```markdown
npm run start
```

##### Sekian dan Terima Kasih