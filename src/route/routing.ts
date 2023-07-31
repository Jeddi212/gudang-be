import express from 'express'
import viewController from '../controllers/view-controller'

const viewRouter = express.Router()

viewRouter.get('/', viewController.index)
viewRouter.get('/login', viewController.login)
viewRouter.get('/register', viewController.register)

export {
    viewRouter
}