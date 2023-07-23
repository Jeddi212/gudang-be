import { JWTPayload } from '../dto/payload'
import jwt from 'jsonwebtoken'

const secretKey = process.env.JWT_SECRET_KEY || ''

const generateJWT = (payload: JWTPayload) => {
    return jwt.sign({ payload }, secretKey, {
        expiresIn: '1h',
    });
}

export {
    generateJWT
}