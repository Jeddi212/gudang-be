"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.corsOption = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_ejs_layouts_1 = __importDefault(require("express-ejs-layouts"));
const api_1 = require("../route/api");
const public_api_1 = require("../route/public-api");
const routing_1 = require("../route/routing");
const public_routing_1 = require("../route/public-routing");
const error_middleware_1 = require("../middleware/error-middleware");
exports.corsOption = {
    origin: process.env.FRONTEND_LINK,
    optionSuccessStatus: 200
};
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use((0, cors_1.default)(exports.corsOption));
exports.app.use(express_1.default.static('public'));
exports.app.set('view engine', 'ejs');
exports.app.use(express_ejs_layouts_1.default);
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(public_api_1.publicApi);
exports.app.use(public_routing_1.publicRouter);
exports.app.use(api_1.privateApi);
exports.app.use(routing_1.privateRouter);
exports.app.use(error_middleware_1.errorMiddleware);
