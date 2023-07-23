import { Payload } from '../dto/payload'
import { UserAuthDTO, UserDTO } from '../dto/user-dto'
import userService from '../services/user-service'
import { Request, Response, NextFunction } from 'express'
import validation from '../utils/validation'

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        validation.validateAuth(req)

        const dto: UserAuthDTO = new UserAuthDTO(req.body.name, req.body.password)

        const user: UserDTO = await userService.register(dto)
        const payload: Payload = new Payload('Register success', user)

        res.status(200).json(payload)
    } catch (e) {
        next(e)
    }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        validation.validateAuth(req)

        const dto: UserAuthDTO = new UserAuthDTO(req.body.name, req.body.password)

        const token: string = await userService.login(dto)
        const payload: Payload = new Payload('Login success', token)

        res.status(200).json(payload)
    } catch (e) {
        next(e)
    }
}

export default {
    register,
    login
}