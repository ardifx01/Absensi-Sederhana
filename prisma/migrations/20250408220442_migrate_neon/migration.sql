/*
  Warnings:

  - The values [terlamat] on the enum `KehadiranEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "KehadiranEnum_new" AS ENUM ('hadir', 'terlambat', 'sakit', 'izin', 'alpha');
ALTER TABLE "Kehadiran" ALTER COLUMN "kehadiran" DROP DEFAULT;
ALTER TABLE "Kehadiran" ALTER COLUMN "kehadiran" TYPE "KehadiranEnum_new" USING ("kehadiran"::text::"KehadiranEnum_new");
ALTER TYPE "KehadiranEnum" RENAME TO "KehadiranEnum_old";
ALTER TYPE "KehadiranEnum_new" RENAME TO "KehadiranEnum";
DROP TYPE "KehadiranEnum_old";
ALTER TABLE "Kehadiran" ALTER COLUMN "kehadiran" SET DEFAULT 'hadir';
COMMIT;
