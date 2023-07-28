import express from 'express'
import hyController from '../controllers/history-controller'
import prController from '../controllers/product-controller'
import whController from '../controllers/warehouse-controller'
import { authMiddleware } from '../middleware/auth-middleware'

const privateRouter = express.Router()
privateRouter.use(authMiddleware)

privateRouter.post('/api/warehouse', whController.createWarehouse)
privateRouter.get('/api/warehouse', whController.readWarehouses)
privateRouter.put('/api/warehouse/:location', whController.updateWarehouse)
privateRouter.delete('/api/warehouse/:location', whController.deleteWarehouse)

privateRouter.post('/api/product', prController.createProduct)
privateRouter.put('/api/product/:name', prController.updateProduct)
privateRouter.delete('/api/product/:name', prController.deleteProduct)

privateRouter.post('/api/history', hyController.createHistory)

export {
    privateRouter
}