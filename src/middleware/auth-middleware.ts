import { Request, Response, NextFunction } from 'express'
import { UserDTO } from '../dto/user-dto'
import jwt from 'jsonwebtoken'

const secretKey = process.env.JWT_SECRET_KEY || ''

declare global {
    namespace Express {
        interface Request {
            payload?: UserDTO
        }
    }
}

function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Token not found' })
    }

    try {
        const decoded = jwt.verify(token, secretKey) as { payload: UserDTO }
        req.payload = decoded.payload
        next()
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' })
    }
}

export {
    authMiddleware
}
