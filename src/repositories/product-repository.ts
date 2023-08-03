import { prisma } from '../utils/database';
import { Product } from '../models/product'
import { ResponseError } from '../dto/response-error'
import { BomMany } from '../models/bom'
import { InventoryDTO } from '../dto/inventory-dto'
import { PrismaClient } from '@prisma/client'

const findProductByName = async (name: string) => {
    return await prisma.product.findFirst({ where: { name: name } })
}

const createProduct = async (product: Product, tx?: PrismaClient) => {
    const client = tx ? tx : prisma

    try {
        return await client.product.create({
            data: product
        })
    } catch (error) {
        await client.$queryRaw`ROLLBACK;`
        throw new ResponseError(500, 'Error during upsert materials', error)
    }
}

const upsertManyProductByName = async (products: Product[], tx?: PrismaClient) => {
    const client = tx ? tx : prisma

    try {
        for (const p of products) {
            await client.product.upsert({
                where: { name: p.name },
                update: {},
                create: { name: p.name, stock: p.stock || 0 }
            })
        }
    } catch (error) {
        await client.$queryRaw`ROLLBACK;`
        throw new ResponseError(500, 'Error during upsert materials', error)
    }
}

const connectMaterials = async (boms: BomMany[], tx?: PrismaClient) => {
    const client = tx ? tx : prisma

    try {
        return await client.bOM.createMany({
            data: boms
        })
    } catch (error) {
        await client.$queryRaw`ROLLBACK;`
        throw new ResponseError(500, 'Error during connect materials', error)
    }
}

const readAllProducts = async (name: string) => {
    return prisma.product.findMany({
        where: { name: { contains: name } }
    })
}

const readProductDetails = async (name: string) => {
    return prisma.product.findFirst({
        where: { name: name },
        include: {
            Needs: {
                select: { materialName: true, quantity: true }
            },
            UsedBy: {
                select: { productName: true }
            },
            Inventory: {
                orderBy: { updatedAt: 'desc' },
            },
            History: {
                orderBy: { updatedAt: 'desc' },
                take: 25
            },
        }
    })
}

const updateProductByName = async (originalName: string, product: Product, tx?: PrismaClient) => {
    const client = tx ? tx : prisma

    try {
        return await client.product.update({
            where: { name: originalName },
            data: {
                name: product.name,
                description: product.description,
                Needs: { deleteMany: {} }
                // stock: product.stock,
            }
        })
    } catch (error) {
        await client.$queryRaw`ROLLBACK;`
        throw new ResponseError(500, 'Error during update product by name', error)
    }
}

const disconnectMaterial = async (productName: string) => {
    return await prisma.bOM.deleteMany({
        where: { productName: productName }
    })
}

const findMaterials = async (productName: string) => {
    return await prisma.bOM.findMany({
        where: { productName: productName }
    })
}

const deleteProductByName = async (name: string) => {
    return await prisma.product.delete({
        where: { name: name },
        include: {
            Needs: {
                select: { materialName: true, quantity: true }
            },
            UsedBy: {
                select: { productName: true }
            },
            Inventory: {
                orderBy: { updatedAt: 'desc' },
            },
            History: {
                orderBy: { updatedAt: 'desc' },
            },
        }
    })
}

const updateManyProductStock = async (tx: PrismaClient, products: InventoryDTO[]) => {
    try {
        for (const p of products) {
            await tx.product.update({
                where: { name: p.product },
                data: { stock: { increment: p.quantity } },
            })
        }
    } catch (error) {
        await tx.$queryRaw`ROLLBACK;`
        throw new ResponseError(500, 'Error during update product stock', error)
    }
}

export default {
    findProductByName,
    createProduct,
    upsertManyProductByName,
    connectMaterials,
    readAllProducts,
    readProductDetails,
    updateProductByName,
    disconnectMaterial,
    findMaterials,
    deleteProductByName,
    updateManyProductStock,
}