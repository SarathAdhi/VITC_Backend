/*
  Warnings:

  - The primary key for the `Faculty` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Faculty" DROP CONSTRAINT "Faculty_pkey",
ALTER COLUMN "uuid" DROP DEFAULT,
ALTER COLUMN "uuid" SET DATA TYPE TEXT,
ADD CONSTRAINT "Faculty_pkey" PRIMARY KEY ("uuid");
DROP SEQUENCE "Faculty_uuid_seq";
