/*
  Warnings:

  - Added the required column `docId` to the `PriceList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PriceList" ADD COLUMN     "docId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "PriceList" ADD CONSTRAINT "PriceList_docId_fkey" FOREIGN KEY ("docId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
