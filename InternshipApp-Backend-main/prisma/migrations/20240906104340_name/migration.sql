/*
  Warnings:

  - You are about to drop the column `certificate` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `college` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `passoutYear` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `mobileNumber` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "certificate",
DROP COLUMN "college",
DROP COLUMN "passoutYear",
DROP COLUMN "skills",
ADD COLUMN     "mobileNumber" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL;
