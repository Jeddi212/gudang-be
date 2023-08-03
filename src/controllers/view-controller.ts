import { Event } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'
import historyService from '../services/transaction-service'
import inventoryService from '../services/inventory-service'
import productService from '../services/product-service'
import transactionService from '../services/transaction-service'
import whService from '../services/warehouse-service'
import validation from '../utils/validation'
import { TransactionDTO } from '../dto/transaction-dto'
import { HistoryDTO } from '../dto/history-dto'

// GUEST VIEW
const index = async (req: Request, res: Response) => {
    const user = req.payload

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

const warehouse = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const warehouse = await whService.readWarehouses()

        res.status(200).render('./guest/warehouse', {
            warehouse,
            title: 'Gudang | Warehouse',
            layout: './layouts/main-hyperscript'
        })
    } catch (e) {
        next(e)
    }
}

const warehouseDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await validation.validateWarehouseLocationParam(req)

        const location: string = req.params.location

        const warehouse = await whService.findWarehouseByLocation(location)

        res.status(200).render('./guest/warehouse-detail', {
            warehouse,
            title: warehouse.location,
            layout: './layouts/main-layout'
        })
    } catch (e) {
        next(e)
    }
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

const transactionDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await validation.validateTransactionId(req)
        const id = parseInt(req.params.id)

        const transactions = await historyService.findTransactionById(id)

        res.render('./guest/transaction-detail', {
            transactions,
            title: `Transaction ${transactions?.id}`,
            layout: './layouts/main-layout'
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

// STAFF VIEW
const createTransactionView = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.render('./staff/transaction-create', {
            title: 'Transaction | Create',
            layout: './layouts/main-hyperscript'
        })
    } catch (e) {
        next(e)
    }
}

const createTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        validation.validateCreateTransaction(req)

        const inventory = req.body.inventory ?? []
        const dto: TransactionDTO = new TransactionDTO(
            req.body.event,
            req.payload?.name as string,
            inventory.map((i: HistoryDTO) => new HistoryDTO(i.quantity, i.product, i.warehouse)))

        const transaction = await historyService.createTransaction(dto)

        // atau redirect aja ke halamannya?
        res.render('./staff/transaction-create-ok', {
            transaction,
            title: 'Transaction | Create | OK',
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

    warehouse,
    warehouseDetail,

    product,
    productDetail,

    transaction,
    transactionDetail,
    transactionData,

    inventory,

    createTransactionView,
    createTransaction,
}