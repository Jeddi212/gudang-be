import cors from 'cors';
import express from 'express'
import { publicRouter } from '../route/public-api'
import { privateRouter } from '../route/api'
import { errorMiddleware } from '../middleware/error-middleware'

export const corsOption = {
    origin: process.env.FRONTEND_LINK,
    optionSuccessStatus: 200
}

export const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOption))
app.use(publicRouter)
app.use(privateRouter)
app.use(errorMiddleware)