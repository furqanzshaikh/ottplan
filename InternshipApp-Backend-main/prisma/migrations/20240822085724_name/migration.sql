/*
  Warnings:

  - You are about to drop the `Detail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Intern` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Detail";

-- DropTable
DROP TABLE "Intern";

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "joiningDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "address" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Empolyee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "passoutYear" INTEGER NOT NULL,
    "college" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "certificate" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "joiningDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "address" TEXT NOT NULL,

    CONSTRAINT "Empolyee_pkey" PRIMARY KEY ("id")
);
