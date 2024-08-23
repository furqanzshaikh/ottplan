/*
  Warnings:

  - You are about to drop the column `mobileNumber` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the `Empolyee` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `certificate` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `college` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passoutYear` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skills` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Role" DROP COLUMN "mobileNumber",
DROP COLUMN "role",
ADD COLUMN     "certificate" TEXT NOT NULL,
ADD COLUMN     "college" TEXT NOT NULL,
ADD COLUMN     "passoutYear" INTEGER NOT NULL,
ADD COLUMN     "skills" TEXT NOT NULL;

-- DropTable
DROP TABLE "Empolyee";

-- CreateTable
CREATE TABLE "Employee" (
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

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);
