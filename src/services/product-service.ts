import { CreateProductDTO } from '../dto/product-dto';
import { ResponseError } from '../dto/response-error';
import { BomMany } from '../models/bom';
import productRepository from '../repositories/product-repository';
import { prisma } from '../utils/database';

const createProduct = async (dto: CreateProductDTO) => {
    if (await productRepository.findProductByName(dto.name)) {
        throw new ResponseError(409, `Product ${dto.name} is already exist`, dto)
    }

    const product = await productRepository.createProduct(dto.mapToProduct())

    let needs: any
    if (dto.needs) {
        needs = await productRepository.upsertManyProductByName(dto.needs.map((p) => p.mapToProduct()))
        await productRepository.connectMaterials(
            dto.needs.map(m => new BomMany(product.name, m.name, m.quantity)))
    }

    (product as any).needs = needs
    return product
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

    let updatedProduct = await productRepository.updateProductByName(originalName, dto.mapToProduct())

    if (dto.needs) {
        if ((await productRepository.disconnectMaterial(dto.name)).count < 1 &&
            (await productRepository.findMaterials(originalName)).length > 0) {
            throw new ResponseError(500, 'Failed disconnect material');
        }

        await productRepository.upsertManyProductByName(dto.needs.map((p) => p.mapToProduct()))
        await productRepository.connectMaterials(
            dto.needs.map(m => new BomMany(dto.name, m.name, m.quantity)))
    }

    (updatedProduct as any).needs = dto.needs
    return updatedProduct
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