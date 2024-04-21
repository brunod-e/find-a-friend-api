/*
  Warnings:

  - Made the column `age` on table `pets` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "pets" ALTER COLUMN "age" SET NOT NULL,
ALTER COLUMN "age" SET DATA TYPE TEXT;
