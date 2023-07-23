import { Payload, JWTPayload } from '../dto/payload'
import { UserAuthDTO } from '../dto/user-dto'
import { UserModel } from '../models/user-model'
import userService from '../services/user-service'
import { Request, Response, NextFunction } from 'express'
import validation from '../utils/validation'

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        validation.validateAuth(req)

        const dto: UserAuthDTO = new UserAuthDTO(req.body.name, req.body.password)

        const user: UserModel = await userService.register(dto)
        const payload: Payload = new Payload(
            'Register success',
            new JWTPayload(user.name, user.id, user.level)
        )

        res.status(200).json(payload)
    } catch (e) {
        next(e)
    }
}

export default {
    register
}