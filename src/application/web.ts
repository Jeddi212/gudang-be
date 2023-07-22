import express from 'express'
import { publicRouter } from '../route/public-api'
import { privateRouter } from '../route/api'
import { errorMiddleware } from '../middleware/error-middleware'

export const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(publicRouter)
app.use(privateRouter)
app.use(errorMiddleware)