import { ResponseError } from '../dto/response-error'
import { Request, Response, NextFunction } from 'express'
import { PrismaClientInitializationError, PrismaClientKnownRequestError, PrismaClientRustPanicError, PrismaClientUnknownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library'

declare global {
    interface Error {
        status?: number
    }
}

function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
    let status = err.status || 500
    let message = err.message || 'Internal Server Error'
    let errors = ''

    if (err instanceof ResponseError) {
        errors = err.data
    } else if (err instanceof PrismaClientKnownRequestError) {
        status = 400
        errors = err.name
    } else if (err instanceof PrismaClientValidationError) {
        status = 422
        errors = err.name
    }

    res.status(status).json({ message: message, error: errors }).end()
}

export {
    errorMiddleware
}