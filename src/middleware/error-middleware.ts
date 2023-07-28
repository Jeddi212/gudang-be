import { ResponseError } from '../dto/response-error'
import { Request, Response, NextFunction } from 'express'
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library'

declare global {
    interface Error {
        status?: number
    }
}

function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
    let status = err.status || 500
    let message = err.message || 'Internal Server Error'
    let data = ''

    if (err instanceof ResponseError) {
        data = err.data
    } else if (err instanceof PrismaClientKnownRequestError) {
        status = 400
        data = err.name
    } else if (err instanceof PrismaClientValidationError) {
        status = 422
        data = err.name
    }

    res.status(status).json({ message: message, error: data }).end()
}

export {
    errorMiddleware
}