import express from 'express'
import viewController from '../controllers/view-controller'

const privateRouter = express.Router()

// STAFF
privateRouter.get('/add-stock', viewController.addStock)
privateRouter.get('/production', viewController.production)
privateRouter.post('/production-form', viewController.productionForm)
privateRouter.get('/selling', viewController.selling)
privateRouter.post('/selling-form', viewController.sellingForm)
// privateRouter.post('/post/transaction', viewController.createTransaction)

// ADMIN
privateRouter.get('/post/warehouse', viewController.createWarehouseForm)
// privateRouter.post('/warehouse', viewController.createWarehouse)
// privateRouter.put('/warehouse/:location', viewController.updateWarehouse)
// privateRouter.delete('/warehouse/:location', viewController.deleteWarehouse)

privateRouter.get('/post/product', viewController.createProductForm)
// privateRouter.post('/product', viewController.createProduct)
privateRouter.get('/put/product/:name', viewController.updateProductForm)
// privateRouter.delete('/product/:name', viewController.deleteProduct)

// privateRouter.put('/transaction/:id', viewController.updateTransaction)

export {
    privateRouter
}