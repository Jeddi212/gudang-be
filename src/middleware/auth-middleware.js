"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.guestAuthMiddleware = exports.authMiddleware = void 0;
const user_dto_1 = require("../dto/user-dto");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_error_1 = require("../dto/response-error");
const client_1 = require("@prisma/client");
const secretKey = process.env.JWT_SECRET_KEY || '';
function authMiddleware(req, res, next) {
    var _a;
    let token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        token = req.cookies.jwt;
    }
    if (!token) {
        throw new response_error_1.ResponseError(401, 'Unauthorized: Token not found');
        // return res.status(401).json({ error: 'Unauthorized: Token not found' })
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        req.payload = decoded.payload;
        next();
    }
    catch (err) {
        throw new response_error_1.ResponseError(401, 'Unauthorized: Invalid token');
        // return res.status(401).json({ error: 'Unauthorized: Invalid token' })
    }
}
exports.authMiddleware = authMiddleware;
function guestAuthMiddleware(req, _res, next) {
    const token = req.cookies.jwt;
    if (!token) {
        req.payload = new user_dto_1.UserDTO('Guest', client_1.Role.GUEST);
        next();
    }
    else {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, secretKey);
            req.payload = decoded.payload;
            next();
        }
        catch (err) {
            throw new response_error_1.ResponseError(401, 'Unauthorized: Invalid token');
        }
    }
}
exports.guestAuthMiddleware = guestAuthMiddleware;
