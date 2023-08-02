import express from 'express'
import ivController from '../controllers/inventory-controller'
import prController from '../controllers/product-controller'
import tnController from '../controllers/transaction-controller'
import whController from '../controllers/warehouse-controller'
import userController from '../controllers/user-controller'

const publicApi = express.Router()

publicApi.post('/api/register', userController.register)
publicApi.post('/api/login', userController.login)

publicApi.get('/api/warehouse', whController.readWarehouses)

publicApi.get('/api/product', prController.readAllProducts)
publicApi.get('/api/product/:name', prController.readProductDetails)

publicApi.get('/api/transaction', tnController.findTransactions)
publicApi.get('/api/transaction/:id', tnController.findTransactionById)

publicApi.get('/api/inventory', ivController.readAllInventories)

export {
    publicApi
}