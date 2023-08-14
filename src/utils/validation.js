"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_error_1 = require("../dto/response-error");
const client_1 = require("@prisma/client");
const express_validator_1 = require("express-validator");
const validateAdminRole = (role = client_1.Role.STAFF) => {
    if (!(role === client_1.Role.ADMIN)) {
        throw new response_error_1.ResponseError(403, "forbidden access");
    }
};
const validateAuth = (req) => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all([
        (0, express_validator_1.body)('name').notEmpty().trim().escape().run(req),
        (0, express_validator_1.body)('password').notEmpty().run(req),
    ]);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new response_error_1.ResponseError(422, "validation error", errors.array());
    }
});
const validateWarehouse = (req) => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all([
        (0, express_validator_1.body)('location').notEmpty().trim().escape().run(req),
    ]);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new response_error_1.ResponseError(422, "validation error", errors.array());
    }
});
const validateWarehouseLocationParam = (req) => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all([
        (0, express_validator_1.param)('location').notEmpty().trim().escape().run(req),
    ]);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new response_error_1.ResponseError(422, "validation error", errors.array());
    }
});
const validateUpdateWarehouse = (req) => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all([
        (0, express_validator_1.param)('location').notEmpty().trim().run(req),
        (0, express_validator_1.body)('location').notEmpty().trim().escape().run(req),
    ]);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new response_error_1.ResponseError(422, "validation error", errors.array());
    }
});
const validateDeleteWarehouse = (req) => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all([
        (0, express_validator_1.param)('location').notEmpty().trim().run(req),
    ]);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new response_error_1.ResponseError(422, "validation error", errors.array());
    }
});
const validateProduct = (req) => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all([
        (0, express_validator_1.body)('name').notEmpty().trim().escape().run(req),
        (0, express_validator_1.body)('materials.*.name').notEmpty().trim()
            .withMessage('material name can\'t be empty')
            .escape().run(req),
    ]);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new response_error_1.ResponseError(422, "validation error", errors.array());
    }
});
const validateProductNameQuery = (req) => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all([
        (0, express_validator_1.query)('name').trim().escape().run(req),
    ]);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new response_error_1.ResponseError(422, "validation error", errors.array());
    }
});
const validateProductNameParam = (req) => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all([
        (0, express_validator_1.param)('name').notEmpty().trim().escape().run(req),
    ]);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new response_error_1.ResponseError(422, "validation error", errors.array());
    }
});
const validateCreateTransaction = (req) => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all([
        (0, express_validator_1.body)('event').notEmpty().trim().escape().run(req),
        (0, express_validator_1.body)('inventory').notEmpty().isArray().run(req),
        (0, express_validator_1.body)('inventory.*.quantity').notEmpty().isInt().run(req),
        (0, express_validator_1.body)('inventory.*.product').notEmpty().trim().escape().run(req),
        (0, express_validator_1.body)('inventory.*.warehouse').notEmpty().trim().escape().run(req),
    ]);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new response_error_1.ResponseError(422, "validation error", errors.array());
    }
});
const validateUpdateTransaction = (req) => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all([
        (0, express_validator_1.body)('event').notEmpty().trim().escape().run(req),
        (0, express_validator_1.body)('username').notEmpty().trim().escape().run(req),
    ]);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new response_error_1.ResponseError(422, "validation error", errors.array());
    }
});
const validateTransactionId = (req) => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all([
        (0, express_validator_1.param)('id').notEmpty().isInt().run(req),
    ]);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new response_error_1.ResponseError(422, "validation error", errors.array());
    }
});
exports.default = {
    validateAdminRole,
    validateAuth,
    validateWarehouse,
    validateWarehouseLocationParam,
    validateUpdateWarehouse,
    validateDeleteWarehouse,
    validateProduct,
    validateProductNameQuery,
    validateProductNameParam,
    validateCreateTransaction,
    validateUpdateTransaction,
    validateTransactionId,
};
