import { ResponseError } from '../dto/response-error'
import { Request, Response, NextFunction } from 'express'

declare global {
    interface Error {
        status?: number
    }
}

function errorMiddleware(err: ResponseError, _req: Request, res: Response, _next: NextFunction) {
    const status = err.status || 500
    const message = err.message || 'Internal Server Error'

    res.status(status).json({ message: message, error: err.data }).end()
}

export {
    errorMiddleware
}