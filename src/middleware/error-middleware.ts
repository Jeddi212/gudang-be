import { ResponseError } from '../dto/response-error'
import { Request, Response, NextFunction } from 'express'

declare global {
    interface Error {
        status?: number
    }
}

function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
    const status = err.status || 500
    const message = err.message || 'Internal Server Error'

    res.status(status).json({ error: message }).end()
}

export {
    errorMiddleware
}