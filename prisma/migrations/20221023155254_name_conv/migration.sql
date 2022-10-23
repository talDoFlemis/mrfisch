/*
  Warnings:

  - You are about to drop the column `codeBlock` on the `Code` table. All the data in the column will be lost.
  - You are about to drop the column `codeTitle` on the `Code` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Code` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfHits` on the `Code` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Code` table. All the data in the column will be lost.
  - You are about to drop the `_favoriteCodes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `code_block` to the `Code` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code_title` to the `Code` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Code` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_favoriteCodes" DROP CONSTRAINT "_favoriteCodes_A_fkey";

-- DropForeignKey
ALTER TABLE "_favoriteCodes" DROP CONSTRAINT "_favoriteCodes_B_fkey";

-- AlterTable
ALTER TABLE "Code" DROP COLUMN "codeBlock",
DROP COLUMN "codeTitle",
DROP COLUMN "createdAt",
DROP COLUMN "numberOfHits",
DROP COLUMN "updatedAt",
ADD COLUMN     "code_block" TEXT NOT NULL,
ADD COLUMN     "code_title" TEXT NOT NULL,
ADD COLUMN     "inserted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "number_views" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "_favoriteCodes";

-- CreateTable
CREATE TABLE "_favorite_codes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_favorite_codes_AB_unique" ON "_favorite_codes"("A", "B");

-- CreateIndex
CREATE INDEX "_favorite_codes_B_index" ON "_favorite_codes"("B");

-- AddForeignKey
ALTER TABLE "_favorite_codes" ADD CONSTRAINT "_favorite_codes_A_fkey" FOREIGN KEY ("A") REFERENCES "Code"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favorite_codes" ADD CONSTRAINT "_favorite_codes_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
