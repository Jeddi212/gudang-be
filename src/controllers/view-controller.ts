import { Event, Role } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'
import inventoryService from '../services/inventory-service'
import productService from '../services/product-service'
import transactionService from '../services/transaction-service'
import validation from '../utils/validation'

const index = async (req: Request, res: Response) => {
    const user = req.payload || { name: 'Guest', level: Role.GUEST }

    res.render('index', {
        user,
        title: 'Gudang',
        layout: './layouts/main-layout'
    })
}

const login = async (_req: Request, res: Response) => {
    res.render('./guest/login', {
        title: 'Gudang | Login',
        layout: './layouts/main-layout'
    })
}

const register = async (_req: Request, res: Response) => {
    res.render('./guest/register', {
        title: 'Gudang | Register',
        layout: './layouts/main-layout'
    })
}

const product = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await validation.validateProductNameQuery(req)

        const name: string = req.query.name as string || ''

        const product = await productService.readAllProducts(name)

        res.status(200).render('./guest/product', {
            product,
            title: 'Gudang | Product',
            layout: './layouts/main-hyperscript'
        })
    } catch (e) {
        next(e)
    }
}

const productDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await validation.validateProductNameParam(req)

        const name: string = req.params.name

        const product = await productService.readProductDetails(name)

        res.status(200).render('./guest/product-detail', {
            product,
            title: product.name,
            layout: './layouts/main-layout'
        })
    } catch (e) {
        next(e)
    }
}

const transaction = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        res.render('./guest/transaction', {
            title: 'Gudang | Transaction',
            layout: './layouts/main-layout'
        })
    } catch (e) {
        next(e)
    }
}

const transactionData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const event = req.query.event as Event || ''
        const username = req.query.username as string || ''

        let transactions = await transactionService.findTransactions(event, username)

        res.render('./guest/transaction-data', {
            transactions,
            title: 'Gudang | Transaction',
            layout: './layouts/plain-layout'
        })
    } catch (e) {
        next(e)
    }
}

const inventory = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const inventories = await inventoryService.readAllInventories()

        res.render('./guest/inventory', {
            inventories,
            title: 'Gudang | Inventory',
            layout: './layouts/main-hyperscript'
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
    productDetail,

    transaction,
    transactionData,

    inventory,
}