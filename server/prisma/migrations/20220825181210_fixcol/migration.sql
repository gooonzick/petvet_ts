/*
  Warnings:

  - You are about to drop the column `drug_date` on the `Vaccination` table. All the data in the column will be lost.
  - You are about to drop the column `drug_name` on the `Vaccination` table. All the data in the column will be lost.
  - Added the required column `drugDate` to the `Vaccination` table without a default value. This is not possible if the table is not empty.
  - Added the required column `drugName` to the `Vaccination` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Allergy" ALTER COLUMN "name" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Pet" ALTER COLUMN "img" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Vaccination" DROP COLUMN "drug_date",
DROP COLUMN "drug_name",
ADD COLUMN     "drugDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "drugName" TEXT NOT NULL;
