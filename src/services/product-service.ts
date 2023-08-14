import { prisma } from '../utils/database'
import { CreateProductDTO } from '../dto/product-dto'
import { ResponseError } from '../dto/response-error'
import { BomMany } from '../models/bom'
import { PrismaClient } from '@prisma/client'
import productRepository from '../repositories/product-repository'
import inventoryRepository from '../repositories/inventory-repository'

const createProduct = async (dto: CreateProductDTO) => {
    if (await productRepository.findProductByName(dto.name)) {
        throw new ResponseError(409, `Product ${dto.name} is already exist`, dto)
    }

    return await prisma.$transaction(async (tx) => {
        const product = await productRepository.createProduct(dto.mapToProduct(), tx as PrismaClient)

        if (dto.needs) {
            await productRepository.upsertManyProductByName(dto.needs.map((p) => p.mapToProduct()), tx as PrismaClient)
            await productRepository.connectMaterials(
                dto.needs.map(m => new BomMany(product.name, m.name, m.quantity)), tx as PrismaClient);

            (product as any).needs = dto.needs
        }

        return product
    })
}

const readAllProducts = async (name: string) => {
    return await productRepository.readAllProducts(name)
}

const readProductDetails = async (name: string) => {
    const product = await productRepository.readProductDetails(name)
    if (!product) {
        throw new ResponseError(404, `Product ${name} not found`)
    }

    return product
}

const readProductAndMaterial = async (name: string) => {
    const product = await productRepository.readProductAndMaterial(name)
    if (!product) {
        throw new ResponseError(404, `Product ${name} not found`)
    }

    return product
}

const updateProduct = async (originalName: string, dto: CreateProductDTO) => {
    const originalProduct = await productRepository.findProductByName(originalName)
    if (!originalProduct) {
        throw new ResponseError(409, `Product ${originalName} is not exist`)
    }

    const isProduct = await productRepository.findProductByName(dto.name)
    if (isProduct && isProduct.name != originalName) {
        throw new ResponseError(409, `Product ${originalName} is already exist`)
    }

    return await prisma.$transaction(async (tx) => {
        let updatedProduct = await productRepository
            .updateProductByName(originalName, dto.mapToProduct(), tx as PrismaClient)

        if (dto.needs) {
            await productRepository.upsertManyProductByName(
                dto.needs.map((p) => p.mapToProduct()), tx as PrismaClient)

            await productRepository.connectMaterials(
                dto.needs.map(m => new BomMany(dto.name, m.name, m.quantity)), tx as PrismaClient);

            (updatedProduct as any).needs = dto.needs
        }

        return updatedProduct
    })
}

const deleteProduct = async (name: string) => {
    return await productRepository.deleteProductByName(name)
}

const getAllMaterials = async () => {
    const materials = await productRepository.getAllRawMaterial()
    return materials.map((item) => item.name)
}

const getAllFinishGoods = async () => {
    return await productRepository.getAllFinishGoods()
}

const getProductListHasStock = async () => {
    const productNames = await productRepository.getAllFinishGoods()
    return await productRepository.getProductListHasStock(productNames)
}

const findMaterials = async (productName: string) => {
    return await productRepository.findMaterials(productName)
}

const getProductMaterialsWithStock = async (productName: string) => {
    const materials = await findMaterials(productName)
    const inventories = await inventoryRepository.getInvetoryOfProducts(materials.map(m => m.materialName))
    return mapForProductionForm(inventories as Inventories[], materials)
}

const getFinishGoodsWithStock = async (productName: string) => {
    return await productRepository.getFinishGoodsWithStock(productName)
}

interface Materials {
    productName: string;
    materialName: string;
    quantity: number;
}

interface Inventories {
    productId: string,
    warehouseId: string,
    quantity: number
}

interface GroupedInventory {
    [productId: string]: {
        name: string
        quantity: number
        inventory: { location: string; stock: number }[]
    }
}

function mapForProductionForm(inventories: Inventories[], materials: Materials[]) {
    let counter = 0
    const data = inventories.reduce((result: GroupedInventory, item: Inventories) => {
        if (!result[item.productId]) {
            result[item.productId] = {
                name: item.productId,
                quantity: materials[counter].quantity,
                inventory: [],
            }
            counter++
        }

        result[item.productId].inventory.push({
            location: item.warehouseId,
            stock: item.quantity,
        })

        return result
    }, {})

    return Object.values(data);
}

export default {
    createProduct,
    readAllProducts,
    readProductDetails,
    readProductAndMaterial,
    updateProduct,
    deleteProduct,
    getAllMaterials,
    getAllFinishGoods,
    findMaterials,
    getProductMaterialsWithStock,
    getFinishGoodsWithStock,
    getProductListHasStock,
}