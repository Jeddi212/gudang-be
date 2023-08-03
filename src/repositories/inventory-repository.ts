import { PrismaClient } from "@prisma/client";
import { InventoryDTO } from "../dto/inventory-dto";
import { ResponseError } from "../dto/response-error";
import { prisma } from "../utils/database";

const readAllInventories = async () => {
    return await prisma.inventory.findMany({
        orderBy: { productId: 'asc' }
    })
}

const updateInventoryStock = async (tx: PrismaClient, products: InventoryDTO[]) => {
    const upsertedRecords = []

    try {
        for (const p of products) {
            const currentStock = await tx.inventory.findUnique({
                where: { productId_warehouseId: { productId: p.product, warehouseId: p.warehouse } },
                select: { quantity: true },
            })

            const newQuantity = (currentStock?.quantity || 0) + p.quantity

            if (newQuantity < 0) {
                throw new ResponseError(400, 'Quantity cannot make stock negative.', {
                    "product": p.product,
                    "warehouse": p.warehouse,
                    "stock": currentStock?.quantity,
                    "quantity": p.quantity,
                    "newStock": newQuantity,
                })
            }

            const upsertedRecord = await tx.inventory.upsert({
                where: { productId_warehouseId: { productId: p.product, warehouseId: p.warehouse } },
                create: { productId: p.product, warehouseId: p.warehouse, quantity: newQuantity },
                update: { quantity: newQuantity },
            })

            upsertedRecords.push(upsertedRecord)
        }

        return upsertedRecords
    } catch (error) {
        await tx.$queryRaw`ROLLBACK;`
        throw new ResponseError(500, 'Error during transaction update inventory stock', error)
    }
}

export default {
    readAllInventories,
    updateInventoryStock,
}