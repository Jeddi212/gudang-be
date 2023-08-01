import { Request, Response, NextFunction } from 'express'
import { CreateProductDTO, Material } from '../dto/product-dto'
import productService from '../services/product-service'
import validation from '../utils/validation'


const index = async (_req: Request, res: Response) => {
    res.render('index', {
        title: 'Gudang',
        layout: './layouts/main-layout.ejs'
    })
}

const login = async (_req: Request, res: Response) => {
    res.render('login', {
        title: 'Gudang | Login',
        layout: './layouts/main-layout.ejs'
    })
}

const register = async (_req: Request, res: Response) => {
    res.render('register', {
        title: 'Gudang | Register',
        layout: './layouts/main-layout.ejs'
    })
}

const product = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await validation.validateProductNameQuery(req)

        const name: string = req.query.name as string || ''

        const product = await productService.readAllProducts(name)

        res.status(200).render('product', {
            product,
            title: 'Gudang | Product',
            layout: './layouts/main-hyperscript.ejs'
        })
    } catch (e) {
        next(e)
    }
}

export default {
    index,
    login,
    register,
    product,
}