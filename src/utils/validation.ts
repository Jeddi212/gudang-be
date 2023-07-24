import { ResponseError } from '../dto/response-error'
import { Request } from 'express'
import { Role } from '@prisma/client';
import { body, param, validationResult } from 'express-validator';

const validateAdminRole = (role: Role = Role.STAFF) => {
    if (!(role === Role.ADMIN)) {
        throw new ResponseError(403, "forbidden access");
    }
}

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

const validateWarehouse = async (req: Request) => {
    await Promise.all([
        body('location').notEmpty().trim().escape().run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ResponseError(422, "validation error", errors.array())
    }
}

const validateUpdateWarehouse = async (req: Request) => {
    await Promise.all([
        body('location').notEmpty().trim().escape().run(req),
        body('id').notEmpty().trim().isInt().run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ResponseError(422, "validation error", errors.array())
    }
}

const validateDeleteWarehouse = async (req: Request) => {
    await Promise.all([
        param('id').notEmpty().trim().isInt().run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ResponseError(422, "validation error", errors.array())
    }
}

export default {
    validateAdminRole,
    validateAuth,
    validateWarehouse,
    validateUpdateWarehouse,
    validateDeleteWarehouse,
}