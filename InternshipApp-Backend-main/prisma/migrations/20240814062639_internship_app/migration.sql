/*
  Warnings:

  - You are about to drop the column `cost` on the `Detail` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Detail` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `Detail` table. All the data in the column will be lost.
  - You are about to drop the column `priority` on the `Detail` table. All the data in the column will be lost.
  - You are about to drop the column `projectName` on the `Detail` table. All the data in the column will be lost.
  - You are about to drop the column `projectType` on the `Detail` table. All the data in the column will be lost.
  - You are about to drop the column `serviceType` on the `Detail` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Detail` table. All the data in the column will be lost.
  - You are about to drop the column `teamLeader` on the `Detail` table. All the data in the column will be lost.
  - You are about to drop the column `teamMember` on the `Detail` table. All the data in the column will be lost.
  - Added the required column `address` to the `Detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `degree` to the `Detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experience` to the `Detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobileNumber` to the `Detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Detail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Detail" DROP COLUMN "cost",
DROP COLUMN "date",
DROP COLUMN "details",
DROP COLUMN "priority",
DROP COLUMN "projectName",
DROP COLUMN "projectType",
DROP COLUMN "serviceType",
DROP COLUMN "size",
DROP COLUMN "teamLeader",
DROP COLUMN "teamMember",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "degree" TEXT NOT NULL,
ADD COLUMN     "experience" TEXT NOT NULL,
ADD COLUMN     "joiningDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "mobileNumber" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;
