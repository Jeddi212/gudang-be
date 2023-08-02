import express from 'express'
import viewController from '../controllers/view-controller'

const publicRouter = express.Router()

publicRouter.get('/', viewController.index)
publicRouter.get('/login', viewController.login)
publicRouter.get('/register', viewController.register)

publicRouter.get('/product', viewController.product)
publicRouter.get('/transaction', viewController.transaction)
publicRouter.get('/transaction-data', viewController.transactionData)

export {
    publicRouter
}