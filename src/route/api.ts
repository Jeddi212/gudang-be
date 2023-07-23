import express from 'express'
import whController from '../controllers/warehouse-controller'
import { authMiddleware } from '../middleware/auth-middleware'

const privateRouter = express.Router()
privateRouter.use(authMiddleware)

privateRouter.post('/api/warehouse', whController.createWarehouse)
privateRouter.get('/api/warehouse', whController.readWarehouses)

export {
    privateRouter
}