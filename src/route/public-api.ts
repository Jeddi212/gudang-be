import express from 'express'
import userController from '../controllers/user-controller'

const publicRouter = express.Router()

publicRouter.post('/register', userController.register)

export {
    publicRouter
}