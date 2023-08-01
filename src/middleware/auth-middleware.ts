import { Request, Response, NextFunction } from 'express'
import { UserDTO } from '../dto/user-dto'
import jwt from 'jsonwebtoken'
import { ResponseError } from '../dto/response-error'

const secretKey = process.env.JWT_SECRET_KEY || ''

function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
        throw new ResponseError(401, 'Unauthorized: Token not found')
        // return res.status(401).json({ error: 'Unauthorized: Token not found' })
    }

    try {
        const decoded = jwt.verify(token, secretKey) as { payload: UserDTO }
        req.payload = decoded.payload
        next()
    } catch (err) {
        throw new ResponseError(401, 'Unauthorized: Invalid token')
        // return res.status(401).json({ error: 'Unauthorized: Invalid token' })
    }
}

export {
    authMiddleware
}
