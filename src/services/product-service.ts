import { CreateProductDTO } from '../dto/product-dto';
import { ResponseError } from '../dto/response-error';
import { BomMany } from '../models/bom';
import productRepository from '../repositories/product-repository';

const createProduct = async (dto: CreateProductDTO) => {
    let needs: any

    if (dto.needs) {
        needs = await productRepository.upsertManyProductByName(dto.needs.map((p) => p.mapToProduct()))
    }

    let isProduct = await productRepository.findProductByName(dto.name)
    if (isProduct) {
        throw new ResponseError(409, `Product is already exist`, dto.mapToProduct())
    }

    const product = await productRepository.createProduct(dto.mapToProduct())

    let final
    if (dto.needs) {
        final = await productRepository.connectMaterials(
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

export default {
    createProduct,
    readAllProducts,
    readProductDetails,
}