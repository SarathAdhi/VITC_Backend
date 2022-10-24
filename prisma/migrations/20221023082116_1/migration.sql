/*
  Warnings:

  - The primary key for the `ResearchDetails` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ResearchDetails` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ResearchDetails" DROP CONSTRAINT "ResearchDetails_pkey",
DROP COLUMN "id";
