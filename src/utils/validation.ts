import { ResponseError } from '../dto/response-error'
import { Request } from 'express'
import { Role } from '@prisma/client';
import { body, query, param, validationResult } from 'express-validator';

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
        param('location').notEmpty().trim().run(req),
        body('location').notEmpty().trim().escape().run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ResponseError(422, "validation error", errors.array())
    }
}

const validateDeleteWarehouse = async (req: Request) => {
    await Promise.all([
        param('location').notEmpty().trim().run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ResponseError(422, "validation error", errors.array())
    }
}

const validateProduct = async (req: Request) => {
    await Promise.all([
        body('name').notEmpty().trim().escape().run(req),
        body('materials.*.name').notEmpty().trim()
            .withMessage('material name can\'t be empty')
            .escape().run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ResponseError(422, "validation error", errors.array());
    }
};

const validateProductNameQuery = async (req: Request) => {
    await Promise.all([
        query('name').trim().escape().run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ResponseError(422, "validation error", errors.array());
    }
};

const validateProductNameParam = async (req: Request) => {
    await Promise.all([
        param('name').notEmpty().trim().escape().run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ResponseError(422, "validation error", errors.array());
    }
};

const validateCreateHistory = async (req: Request) => {
    await Promise.all([
        body('event').notEmpty().trim().escape().run(req),
        body('inventory.*.quantity').notEmpty().isInt().run(req),
        body('inventory.*.product').notEmpty().trim().escape().run(req),
        body('inventory.*.warehouse').notEmpty().trim().escape().run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ResponseError(422, "validation error", errors.array());
    }
};

export default {
    validateAdminRole,
    validateAuth,
    validateWarehouse,
    validateUpdateWarehouse,
    validateDeleteWarehouse,
    validateProduct,
    validateProductNameQuery,
    validateProductNameParam,
    validateCreateHistory,
}