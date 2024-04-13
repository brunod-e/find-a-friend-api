-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MEMBER');

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "age" INTEGER,
    "size" TEXT,
    "energy_level" TEXT,
    "independence_level" TEXT,
    "environment" TEXT,
    "photos" TEXT[],
    "requirements" TEXT[],

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);
