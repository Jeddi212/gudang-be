import { ResponseError } from '../dto/response-error'

const errorMiddleware = async (err, _req, res, _next) => {
    const status = err.status || 500
    const message = err.message || 'Internal Server Error'

    if (err instanceof ResponseError) {
        res.status(status).json({
            error: message
        }).end()
    }
}

export {
    errorMiddleware
}