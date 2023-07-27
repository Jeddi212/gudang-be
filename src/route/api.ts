import express from 'express'
import prController from '../controllers/product-controller'
import whController from '../controllers/warehouse-controller'
import { authMiddleware } from '../middleware/auth-middleware'

const privateRouter = express.Router()
privateRouter.use(authMiddleware)

privateRouter.post('/api/warehouse', whController.createWarehouse)
privateRouter.get('/api/warehouse', whController.readWarehouses)
privateRouter.put('/api/warehouse/:id', whController.updateWarehouse)
privateRouter.delete('/api/warehouse/:id', whController.deleteWarehouse)

privateRouter.post('/api/product', prController.createProduct)
privateRouter.get('/api/product', prController.readAllProducts)

export {
    privateRouter
}