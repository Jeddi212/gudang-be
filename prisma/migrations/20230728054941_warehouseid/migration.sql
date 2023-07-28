/*
  Warnings:

  - The primary key for the `Warehouse` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Warehouse` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_warehouseId_fkey";

-- DropIndex
DROP INDEX "Warehouse_location_key";

-- AlterTable
ALTER TABLE "Inventory" ALTER COLUMN "warehouseId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Warehouse" DROP CONSTRAINT "Warehouse_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Warehouse_pkey" PRIMARY KEY ("location");

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("location") ON DELETE RESTRICT ON UPDATE CASCADE;
