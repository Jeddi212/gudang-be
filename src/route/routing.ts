import express from 'express'
import viewController from '../controllers/view-controller'

const privateRouter = express.Router()

privateRouter.get('/', viewController.index)
privateRouter.get('/login', viewController.login)
privateRouter.get('/register', viewController.register)

privateRouter.get('/product', viewController.product)
privateRouter.get('/transaction', viewController.transaction)
privateRouter.get('/transaction-data', viewController.transactionData)

export {
    privateRouter
}