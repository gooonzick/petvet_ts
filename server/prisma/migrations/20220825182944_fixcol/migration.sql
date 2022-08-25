/*
  Warnings:

  - You are about to drop the column `clinic_address` on the `DocInfo` table. All the data in the column will be lost.
  - Added the required column `clinicAddress` to the `DocInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DocInfo" DROP COLUMN "clinic_address",
ADD COLUMN     "clinicAddress" TEXT NOT NULL;
