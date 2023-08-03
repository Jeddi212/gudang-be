import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import ejsLayouts from 'express-ejs-layouts'
import { privateApi } from '../route/api'
import { publicApi } from '../route/public-api'
import { privateRouter } from '../route/routing'
import { publicRouter } from '../route/public-routing'
import { errorMiddleware } from '../middleware/error-middleware'

export const corsOption = {
    origin: process.env.FRONTEND_LINK,
    optionSuccessStatus: 200
}

export const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOption))

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(ejsLayouts);

app.use(cookieParser())
app.use(publicApi)
app.use(publicRouter)

app.use(privateApi)
app.use(privateRouter)

app.use(errorMiddleware)