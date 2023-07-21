import express from 'express'
import { publicRouter } from '../route/public-api'
import { errorMiddleware } from '../middleware/error-middleware'

export const app = express()
app.use(publicRouter)
app.use(errorMiddleware)