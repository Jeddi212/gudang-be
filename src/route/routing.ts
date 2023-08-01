import express from 'express'
import viewController from '../controllers/view-controller'

const viewRouter = express.Router()

viewRouter.get('/', viewController.index)
viewRouter.get('/login', viewController.login)
viewRouter.get('/register', viewController.register)

viewRouter.get('/product', viewController.product)
viewRouter.get('/transaction', viewController.transaction)
viewRouter.get('/transaction-data', viewController.transactionData)

export {
    viewRouter
}