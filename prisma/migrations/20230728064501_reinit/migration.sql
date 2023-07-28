-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STAFF', 'ADMIN');

-- CreateEnum
CREATE TYPE "Event" AS ENUM ('PRODUCTION', 'INPUT');

-- CreateTable
CREATE TABLE "User" (
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "level" "Role" NOT NULL DEFAULT 'STAFF',

    CONSTRAINT "User_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Warehouse" (
    "location" TEXT NOT NULL,

    CONSTRAINT "Warehouse_pkey" PRIMARY KEY ("location")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BOM" (
    "productName" TEXT NOT NULL,
    "materialName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "BOM_pkey" PRIMARY KEY ("productName","materialName")
);

-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "event" "Event" NOT NULL,
    "userName" TEXT NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "historyId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "warehouseId" TEXT NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");

-- CreateIndex
CREATE INDEX "Product_name_idx" ON "Product"("name");

-- AddForeignKey
ALTER TABLE "BOM" ADD CONSTRAINT "BOM_productName_fkey" FOREIGN KEY ("productName") REFERENCES "Product"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BOM" ADD CONSTRAINT "BOM_materialName_fkey" FOREIGN KEY ("materialName") REFERENCES "Product"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_userName_fkey" FOREIGN KEY ("userName") REFERENCES "User"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_historyId_fkey" FOREIGN KEY ("historyId") REFERENCES "History"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("location") ON DELETE RESTRICT ON UPDATE CASCADE;
