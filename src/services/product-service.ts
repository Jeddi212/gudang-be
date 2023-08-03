import { prisma } from '../utils/database';
import { CreateProductDTO } from '../dto/product-dto';
import { ResponseError } from '../dto/response-error';
import { BomMany } from '../models/bom';
import { PrismaClient } from '@prisma/client';
import productRepository from '../repositories/product-repository';

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
        throw new ResponseError(404, `Product ${name} not found`);
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

export default {
    createProduct,
    readAllProducts,
    readProductDetails,
    updateProduct,
    deleteProduct,
}