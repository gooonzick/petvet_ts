-- DropForeignKey
ALTER TABLE "DocSchedules" DROP CONSTRAINT "DocSchedules_petId_fkey";

-- DropForeignKey
ALTER TABLE "DocSchedules" DROP CONSTRAINT "DocSchedules_userId_fkey";

-- AlterTable
ALTER TABLE "DocSchedules" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "petId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "DocSchedules" ADD CONSTRAINT "DocSchedules_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocSchedules" ADD CONSTRAINT "DocSchedules_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
