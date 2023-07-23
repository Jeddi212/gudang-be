import express from 'express'
import userController from '../controllers/user-controller'
import { authMiddleware } from '../middleware/auth-middleware'

const privateRouter = express.Router()
privateRouter.use(authMiddleware)

export {
    privateRouter
}