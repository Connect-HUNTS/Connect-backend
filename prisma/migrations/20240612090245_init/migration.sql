/*
  Warnings:

  - You are about to drop the column `types` on the `Startup` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Investor" ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "rate" TEXT,
ADD COLUMN     "telegram" TEXT;

-- AlterTable
ALTER TABLE "Partner" ADD COLUMN     "linkedin" TEXT;

-- AlterTable
ALTER TABLE "Startup" DROP COLUMN "types",
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "type" TEXT[];
