/*
  Warnings:

  - The primary key for the `BOM` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `materialId` on the `BOM` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `BOM` table. All the data in the column will be lost.
  - Added the required column `materialName` to the `BOM` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productName` to the `BOM` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BOM" DROP CONSTRAINT "BOM_materialId_fkey";

-- DropForeignKey
ALTER TABLE "BOM" DROP CONSTRAINT "BOM_productId_fkey";

-- AlterTable
ALTER TABLE "BOM" DROP CONSTRAINT "BOM_pkey",
DROP COLUMN "materialId",
DROP COLUMN "productId",
ADD COLUMN     "materialName" TEXT NOT NULL,
ADD COLUMN     "productName" TEXT NOT NULL,
ADD CONSTRAINT "BOM_pkey" PRIMARY KEY ("productName", "materialName");

-- AddForeignKey
ALTER TABLE "BOM" ADD CONSTRAINT "BOM_productName_fkey" FOREIGN KEY ("productName") REFERENCES "Product"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BOM" ADD CONSTRAINT "BOM_materialName_fkey" FOREIGN KEY ("materialName") REFERENCES "Product"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
