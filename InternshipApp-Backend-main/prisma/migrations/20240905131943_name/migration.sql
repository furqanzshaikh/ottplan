/*
  Warnings:

  - You are about to drop the column `mobileNumber` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `certificate` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `college` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passoutYear` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skills` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "mobileNumber",
DROP COLUMN "password",
DROP COLUMN "role",
ADD COLUMN     "certificate" TEXT NOT NULL,
ADD COLUMN     "college" TEXT NOT NULL,
ADD COLUMN     "passoutYear" INTEGER NOT NULL,
ADD COLUMN     "skills" TEXT NOT NULL;
