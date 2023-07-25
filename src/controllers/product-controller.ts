import { Payload } from '../dto/payload'
import { Request, Response, NextFunction } from 'express'
import { CreateProductDTO, Material } from '../dto/product-dto'
import productService from '../services/product-service'
import validation from '../utils/validation'

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await validation.validateAuth(req)

        const dto: CreateProductDTO = new CreateProductDTO(
            req.body.name,
            req.body.materials.map((m: Material) => new Material(m.name, m.quantity)))

        const user = await productService.createProduct(dto)
        const payload: Payload = new Payload('Register success', user)

        res.status(200).json(payload)
    } catch (e) {
        next(e)
    }
}

export default {
    createProduct
}