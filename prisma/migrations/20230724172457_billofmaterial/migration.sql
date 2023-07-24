/*
  Warnings:

  - You are about to drop the column `quantity` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `_BOM` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `quantity` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BOM" DROP CONSTRAINT "_BOM_A_fkey";

-- DropForeignKey
ALTER TABLE "_BOM" DROP CONSTRAINT "_BOM_B_fkey";

-- AlterTable
ALTER TABLE "History" ADD COLUMN     "productionId" INTEGER,
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "quantity",
ADD COLUMN     "stock" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_BOM";

-- CreateTable
CREATE TABLE "BOM" (
    "productId" INTEGER NOT NULL,
    "materialId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "BOM_pkey" PRIMARY KEY ("productId","materialId")
);

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_productionId_fkey" FOREIGN KEY ("productionId") REFERENCES "Production"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BOM" ADD CONSTRAINT "BOM_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BOM" ADD CONSTRAINT "BOM_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
