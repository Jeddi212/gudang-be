import express from 'express'
import viewController from '../controllers/view-controller'

const privateRouter = express.Router()

// privateRouter.post('/warehouse', viewController.createWarehouse)
// privateRouter.get('/warehouse', viewController.readWarehouses)
// privateRouter.put('/warehouse/:location', viewController.updateWarehouse)
// privateRouter.delete('/warehouse/:location', viewController.deleteWarehouse)

// privateRouter.post('/product', viewController.createProduct)
// privateRouter.put('/product/:name', viewController.updateProduct)
// privateRouter.delete('/product/:name', viewController.deleteProduct)

// privateRouter.post('/transaction', viewController.createTransaction)
// privateRouter.put('/transaction/:id', viewController.updateTransaction)

export {
    privateRouter
}