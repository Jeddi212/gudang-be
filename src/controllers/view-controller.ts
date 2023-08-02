import { Event, Role } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'
import productService from '../services/product-service'
import transactionService from '../services/transaction-service'
import validation from '../utils/validation'

const index = async (req: Request, res: Response) => {
    const user = req.payload || { name: 'Guest', level: Role.GUEST }

    res.render('index', {
        user,
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

const transaction = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        res.render('transaction', {
            title: 'Gudang | Transaction',
            layout: './layouts/main-layout.ejs'
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

        res.render('transaction-data', {
            transactions,
            title: 'Gudang | Transaction',
            layout: './layouts/plain-layout.ejs'
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
    transaction,
    transactionData,
}