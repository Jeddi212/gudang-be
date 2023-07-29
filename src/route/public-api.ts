import express from 'express'
import ivController from '../controllers/inventory-controller'
import prController from '../controllers/product-controller'
import tnController from '../controllers/transaction-controller'
import userController from '../controllers/user-controller'

const publicRouter = express.Router()

publicRouter.post('/register', userController.register)
publicRouter.post('/login', userController.login)

publicRouter.get('/api/product', prController.readAllProducts)
publicRouter.get('/api/product/:name', prController.readProductDetails)

publicRouter.get('/api/transaction', tnController.findTransactions)
publicRouter.get('/api/transaction/:id', tnController.findTransactionById)

publicRouter.get('/api/inventory', ivController.readAllInventories)

export {
    publicRouter
}