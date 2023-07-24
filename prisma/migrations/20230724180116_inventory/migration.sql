/*
  Warnings:

  - You are about to drop the column `productId` on the `History` table. All the data in the column will be lost.
  - You are about to drop the column `productionId` on the `History` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `History` table. All the data in the column will be lost.
  - You are about to drop the column `warehouseId` on the `History` table. All the data in the column will be lost.
  - You are about to drop the `Production` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `event` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Event" AS ENUM ('PRODUCTION', 'INPUT');

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_productId_fkey";

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_productionId_fkey";

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_warehouseId_fkey";

-- DropForeignKey
ALTER TABLE "Production" DROP CONSTRAINT "Production_productId_fkey";

-- AlterTable
ALTER TABLE "History" DROP COLUMN "productId",
DROP COLUMN "productionId",
DROP COLUMN "quantity",
DROP COLUMN "warehouseId",
ADD COLUMN     "event" "Event" NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Production";

-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "historyId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "warehouseId" INTEGER NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_historyId_fkey" FOREIGN KEY ("historyId") REFERENCES "History"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
