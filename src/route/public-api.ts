import express from 'express'
import userController from '../controllers/user-controller'

const publicRouter = express.Router()

publicRouter.post('/register', userController.register)
publicRouter.post('/login', userController.login)

export {
    publicRouter
}