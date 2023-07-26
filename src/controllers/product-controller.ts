import { Payload } from '../dto/payload'
import { Request, Response, NextFunction } from 'express'
import { CreateProductDTO, Material } from '../dto/product-dto'
import productService from '../services/product-service'
import validation from '../utils/validation'

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        validation.validateAdminRole(req.payload?.level)
        await validation.validateProduct(req)

        const materials = req.body.materials ?? [];
        const dto: CreateProductDTO = new CreateProductDTO(
            req.body.name,
            materials.map((m: Material) => new Material(m.name, m.quantity)))

        const product = await productService.createProduct(dto)
        const payload: Payload = new Payload('Product successfully created', product)

        res.status(200).json(payload)
    } catch (e) {
        next(e)
    }
}

export default {
    createProduct
}