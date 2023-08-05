"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const response_error_1 = require("../dto/response-error");
const library_1 = require("@prisma/client/runtime/library");
function errorMiddleware(err, _req, res, _next) {
    let status = err.status || 500;
    let message = err.message || 'Internal Server Error';
    let data = '';
    if (err instanceof response_error_1.ResponseError) {
        data = err.data;
    }
    else if (err instanceof library_1.PrismaClientKnownRequestError) {
        status = 400;
        data = err.name;
    }
    else if (err instanceof library_1.PrismaClientValidationError) {
        status = 422;
        data = err.name;
    }
    res.status(status).render('error', {
        data,
        message,
        status,
        title: 'Gudang | Error',
        layout: './layouts/plain-layout.ejs'
    });
    res.end();
    // res.status(status).json({ message: message, data: data }).end()
}
exports.errorMiddleware = errorMiddleware;
