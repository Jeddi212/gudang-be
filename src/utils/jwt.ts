import { UserDTO } from '../dto/user-dto';
import jwt from 'jsonwebtoken'

const secretKey = process.env.JWT_SECRET_KEY || ''

const generateJWT = (payload: UserDTO) => {
    return jwt.sign({ payload }, secretKey, {
        expiresIn: '9h',
    })
}

export {
    generateJWT
}