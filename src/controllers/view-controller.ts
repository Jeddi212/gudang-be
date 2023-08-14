import { Event } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'
import historyService from '../services/transaction-service'
import inventoryService from '../services/inventory-service'
import productService from '../services/product-service'
import transactionService from '../services/transaction-service'
import whService from '../services/warehouse-service'
import validation from '../utils/validation'

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
        const user = req.payload
        const location: string = req.params.location

        const warehouse = await whService.findWarehouseByLocation(location)

        res.status(200).render('./guest/warehouse-detail', {
            user,
            warehouse,
            title: warehouse.location,
            layout: './layouts/main-hyperscript'
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
        const user = req.payload
        const name: string = req.params.name

        const product = await productService.readProductDetails(name)

        res.status(200).render('./guest/product-detail', {
            user,
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
const addStock = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const materials = await productService.getAllMaterials()
        const warehouses = await whService.readWarehouses()

        res.render('./staff/add-stock', {
            materials,
            warehouses,
            title: 'Add Stock',
            layout: './layouts/main-vanilla'
        })
    } catch (e) {
        next(e)
    }
}

const production = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await productService.getAllFinishGoods()
        const warehouses = await whService.readWarehouses()

        res.render('./staff/production', {
            products,
            warehouses,
            title: 'Production',
            layout: './layouts/main-hyperscript'
        })
    } catch (e) {
        next(e)
    }
}

const productionForm = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = req.body.product[0] ? req.body.product[0] : req.body.product
        const materials = await productService.getProductMaterialsWithStock(product)

        res.render('./staff/production-form', {
            materials,
            title: 'Material',
            layout: './layouts/plain-layout'
        })
    } catch (e) {
        next(e)
    }
}

const selling = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await productService.getProductListHasStock()

        res.render('./staff/selling', {
            products,
            title: 'Selling',
            layout: './layouts/main-hyperscript'
        })
    } catch (e) {
        next(e)
    }
}

const sellingForm = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productName = req.body.productName
        const product = await productService.getFinishGoodsWithStock(productName)

        res.render('./staff/selling-form', {
            product,
            title: 'Detail',
            layout: './layouts/plain-layout'
        })
    } catch (e) {
        next(e)
    }
}

// ADMIN VIEW
const createWarehouseForm = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.render('./admin/createWarehouse', {
            title: 'Create Warehouse',
            layout: './layouts/main-layout'
        })
    } catch (e) {
        next(e)
    }
}

const createProductForm = async (req: Request, res: Response, next: NextFunction) => {
    const products = await productService.readAllProducts('')

    try {
        res.render('./admin/createProduct', {
            products,
            title: 'Create Product',
            layout: './layouts/main-vanilla'
        })
    } catch (e) {
        next(e)
    }
}

const updateProductForm = async (req: Request, res: Response, next: NextFunction) => {
    await validation.validateProductNameParam(req)
    const productName: string = req.params.name

    const productList = await productService.readAllProducts('')
    const product = await productService.readProductAndMaterial(productName)

    try {
        res.render('./admin/updateProduct', {
            product,
            productList,
            title: 'Update Product',
            layout: './layouts/main-vanilla'
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

    addStock,
    production,
    productionForm,
    selling,
    sellingForm,

    createWarehouseForm,
    createProductForm,
    updateProductForm,
}