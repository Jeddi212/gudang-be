import { CreateProductDTO } from '../dto/product-dto';
import { BomMany } from '../models/bom';
import productRepository from '../repositories/product-repository';

const createProduct = async (dto: CreateProductDTO) => {
    let needs: any

    if (dto.needs) {
        needs = await productRepository.upsertManyProductByName(dto.needs.map((p) => p.mapToProduct()))
    }

    const product = await productRepository.createProduct(dto.mapToProduct())

    let final
    if (dto.needs) {
        final = await productRepository.addMaterials(
            dto.needs.map((m, i) => {
                return new BomMany(product.id, needs[i].id, m.quantity)
            }))
    }

    return product
}

export default {
    createProduct
}