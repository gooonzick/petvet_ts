/*
  Warnings:

  - You are about to drop the `_CategoryToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProfileToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToUser" DROP CONSTRAINT "_CategoryToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToUser" DROP CONSTRAINT "_CategoryToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProfileToUser" DROP CONSTRAINT "_ProfileToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProfileToUser" DROP CONSTRAINT "_ProfileToUser_B_fkey";

-- DropTable
DROP TABLE "_CategoryToUser";

-- DropTable
DROP TABLE "_ProfileToUser";

-- CreateTable
CREATE TABLE "ProfileOnUser" (
    "docId" INTEGER NOT NULL,
    "profileId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProfileOnUser_pkey" PRIMARY KEY ("docId","profileId")
);

-- CreateTable
CREATE TABLE "CategoryOnUser" (
    "docId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CategoryOnUser_pkey" PRIMARY KEY ("docId","categoryId")
);

-- AddForeignKey
ALTER TABLE "ProfileOnUser" ADD CONSTRAINT "ProfileOnUser_docId_fkey" FOREIGN KEY ("docId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileOnUser" ADD CONSTRAINT "ProfileOnUser_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryOnUser" ADD CONSTRAINT "CategoryOnUser_docId_fkey" FOREIGN KEY ("docId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryOnUser" ADD CONSTRAINT "CategoryOnUser_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
