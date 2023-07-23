import { ResponseError } from '../dto/response-error'
import { body, validationResult } from 'express-validator';
import { Request } from 'express'

const validateAuth = async (req: Request) => {
    await Promise.all([
        body('name').notEmpty().trim().escape().run(req),
        body('password').notEmpty().run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ResponseError(422, "validation error", errors.array())
    }
}

export default {
    validateAuth
}