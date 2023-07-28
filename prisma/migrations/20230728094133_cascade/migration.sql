-- DropForeignKey
ALTER TABLE "BOM" DROP CONSTRAINT "BOM_materialName_fkey";

-- DropForeignKey
ALTER TABLE "BOM" DROP CONSTRAINT "BOM_productName_fkey";

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_userName_fkey";

-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_historyId_fkey";

-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_productId_fkey";

-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_warehouseId_fkey";

-- AddForeignKey
ALTER TABLE "BOM" ADD CONSTRAINT "BOM_productName_fkey" FOREIGN KEY ("productName") REFERENCES "Product"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BOM" ADD CONSTRAINT "BOM_materialName_fkey" FOREIGN KEY ("materialName") REFERENCES "Product"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_userName_fkey" FOREIGN KEY ("userName") REFERENCES "User"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_historyId_fkey" FOREIGN KEY ("historyId") REFERENCES "History"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("location") ON DELETE CASCADE ON UPDATE CASCADE;
