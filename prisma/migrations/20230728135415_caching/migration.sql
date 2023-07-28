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
    "name" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "BOM" (
    "productName" TEXT NOT NULL,
    "materialName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "BOM_pkey" PRIMARY KEY ("productName","materialName")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "event" "Event" NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "transactionId" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,
    "warehouseId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productId" TEXT NOT NULL,
    "warehouseId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("productId","warehouseId")
);

-- AddForeignKey
ALTER TABLE "BOM" ADD CONSTRAINT "BOM_productName_fkey" FOREIGN KEY ("productName") REFERENCES "Product"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BOM" ADD CONSTRAINT "BOM_materialName_fkey" FOREIGN KEY ("materialName") REFERENCES "Product"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("location") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("location") ON DELETE CASCADE ON UPDATE CASCADE;
