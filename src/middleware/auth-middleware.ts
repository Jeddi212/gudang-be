import { JWTPayload } from '../dto/payload'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const secretKey = process.env.JWT_SECRET_KEY || ''

declare global {
    namespace Express {
        interface Request {
            payload?: JWTPayload
        }
    }
}

function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Token not found' })
    }

    try {
        const decoded = jwt.verify(token, secretKey) as { payload: JWTPayload }
        req.payload = decoded.payload
        next()
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' })
    }
}

export {
    authMiddleware
}
