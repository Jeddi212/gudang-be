import { prisma } from '../utils/database'
import { Product } from '../models/product'
import { ResponseError } from '../dto/response-error'
import { BomMany } from '../models/bom'
import { HistoryDTO } from '../dto/history-dto'
import { PrismaClient } from '@prisma/client'

const findProductByName = async (name: string) => {
    return await prisma.product.findFirst({ where: { name: name } })
}

const createProduct = async (product: Product) => {
    return await prisma.product.create({
        data: {
            name: product.name,
            stock: product.stock,
        }
    })
}

const upsertManyProductByName = async (products: Product[]) => {
    try {
        return await prisma.$transaction(
            products.map((p) => {
                return prisma.product.upsert({
                    where: { name: p.name },
                    update: {},
                    create: { name: p.name, stock: p.stock || 0 }
                })
            })
        )
    } catch (error) {
        await prisma.$queryRaw`ROLLBACK;`
        throw new ResponseError(500, 'Error during transaction upsert many product by name')
    }
}

const connectMaterials = async (boms: BomMany[]) => {
    return await prisma.bOM.createMany({
        data: boms
    })
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
            Inventory: {
                orderBy: { updatedAt: 'desc' },
                take: 25
            },
            UsedBy: {
                select: { productName: true }
            },
        }
    })
}

const updateProductByName = async (originalName: string, product: Product) => {
    return await prisma.product.update({
        where: { name: originalName },
        data: {
            name: product.name,
            // stock: product.stock,
        }
    })
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
            Inventory: {
                orderBy: { updatedAt: 'desc' },
            },
            UsedBy: {
                select: { productName: true }
            },
        }
    })
}

const updateManyProductStock = async (tx: PrismaClient, products: HistoryDTO[]) => {
    try {
        for (const p of products) {
            await tx.product.update({
                where: { name: p.product },
                data: { stock: { increment: p.quantity } },
            })
        }
    } catch (error) {
        await tx.$queryRaw`ROLLBACK;`
        throw new ResponseError(500, 'Error during transaction update product stock', error);
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