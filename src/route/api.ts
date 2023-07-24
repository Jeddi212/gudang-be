import express from 'express'
import whController from '../controllers/warehouse-controller'
import { authMiddleware } from '../middleware/auth-middleware'

const privateRouter = express.Router()
privateRouter.use(authMiddleware)

privateRouter.post('/api/warehouse', whController.createWarehouse)
privateRouter.get('/api/warehouse', whController.readWarehouses)
privateRouter.put('/api/warehouse/:id', whController.updateWarehouse)
privateRouter.delete('/api/warehouse/:id', whController.deleteWarehouse)

export {
    privateRouter
}