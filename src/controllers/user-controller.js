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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const payload_1 = require("../dto/payload");
const user_dto_1 = require("../dto/user-dto");
const user_service_1 = __importDefault(require("../services/user-service"));
const validation_1 = __importDefault(require("../utils/validation"));
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield validation_1.default.validateAuth(req);
        const dto = new user_dto_1.UserAuthDTO(req.body.name, req.body.password);
        const user = yield user_service_1.default.register(dto);
        const payload = new payload_1.Payload('Register success', user);
        res.status(200).json(payload);
    }
    catch (e) {
        next(e);
    }
});
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield validation_1.default.validateAuth(req);
        const dto = new user_dto_1.UserAuthDTO(req.body.name, req.body.password);
        const token = yield user_service_1.default.login(dto);
        const payload = new payload_1.Payload('Login success', token);
        res.status(200).json(payload);
    }
    catch (e) {
        next(e);
    }
});
exports.default = {
    register,
    login
};
