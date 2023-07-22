import { JWTPayload } from '../dto/payload'
import { ResponseError } from '../dto/response-error'
import { UserAuthDTO } from '../dto/user-dto'
import { UserModel } from '../models/user-model'
import userService from '../services/user-service'
import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator';

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Promise.all([
            body('name').notEmpty().trim().escape().run(req),
            body('password').notEmpty().run(req),
        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ResponseError(422, "validation error", errors.array())
        }

        const dto: UserAuthDTO = new UserAuthDTO(req.body.name, req.body.password)

        const user: UserModel = await userService.register(dto)
        const payload: JWTPayload = new JWTPayload(user.name, user.id, user.level)
        res.status(200).json(payload)
    } catch (e) {
        next(e)
    }
}

export default {
    register
}