/*
  Warnings:

  - You are about to drop the column `logo` on the `Investor` table. All the data in the column will be lost.
  - You are about to drop the column `logo` on the `Partner` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Investor" DROP COLUMN "logo";

-- AlterTable
ALTER TABLE "Partner" DROP COLUMN "logo";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profileImage" TEXT;
