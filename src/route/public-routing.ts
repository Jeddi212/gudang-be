import express from 'express'
import viewController from '../controllers/view-controller'
import { guestAuthMiddleware } from '../middleware/auth-middleware'

const publicRouter = express.Router()

publicRouter.get('/', viewController.index)

publicRouter.get('/menu', guestAuthMiddleware, viewController.menu)
publicRouter.get('/login', guestAuthMiddleware, viewController.login)
publicRouter.get('/register', guestAuthMiddleware, viewController.register)

publicRouter.get('/warehouse', guestAuthMiddleware, viewController.warehouse)
publicRouter.get('/warehouse/:location', guestAuthMiddleware, viewController.warehouseDetail)

publicRouter.get('/product', guestAuthMiddleware, viewController.product)
publicRouter.get('/product/:name', guestAuthMiddleware, viewController.productDetail)

publicRouter.get('/transaction', guestAuthMiddleware, viewController.transaction)
publicRouter.get('/transaction/:id', guestAuthMiddleware, viewController.transactionDetail)
publicRouter.get('/transaction-data', guestAuthMiddleware, viewController.transactionData)

publicRouter.get('/inventory', guestAuthMiddleware, viewController.inventory)

export {
    publicRouter
}