import express from 'express'
import viewController from '../controllers/view-controller'
import { guestAuthMiddleware } from '../middleware/auth-middleware'

const publicRouter = express.Router()

publicRouter.get('/', viewController.index)
publicRouter.use(guestAuthMiddleware)

publicRouter.get('/menu', viewController.menu)
publicRouter.get('/login', viewController.login)
publicRouter.get('/register', viewController.register)

publicRouter.get('/warehouse', viewController.warehouse)
publicRouter.get('/warehouse/:location', viewController.warehouseDetail)

publicRouter.get('/product', viewController.product)
publicRouter.get('/product/:name', viewController.productDetail)

publicRouter.get('/transaction', viewController.transaction)
publicRouter.get('/transaction/:id', viewController.transactionDetail)
publicRouter.get('/transaction-data', viewController.transactionData)

publicRouter.get('/inventory', guestAuthMiddleware, viewController.inventory)

export {
    publicRouter
}