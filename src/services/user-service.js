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
const jwt_1 = require("../utils/jwt");
const response_error_1 = require("../dto/response-error");
const user_dto_1 = require("../dto/user-dto");
const user_repository_1 = __importDefault(require("../repositories/user-repository"));
const register = (dto) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_repository_1.default.findUserByName(dto.name)) {
        throw new response_error_1.ResponseError(409, `Username ${dto.name} is already used`);
    }
    const user = yield user_repository_1.default.createNewUser(dto.mapToModel());
    return new user_dto_1.UserDTO(user.name, user.level);
});
const login = (dto) => __awaiter(void 0, void 0, void 0, function* () {
    const isUser = yield user_repository_1.default.findUserByName(dto.name);
    if (!isUser) {
        throw new response_error_1.ResponseError(404, `${dto.name} user not found`);
    }
    if ((isUser.password !== dto.password)) {
        throw new response_error_1.ResponseError(401, `Invalid credentials`);
    }
    return (0, jwt_1.generateJWT)(new user_dto_1.UserDTO(isUser.name, isUser.level));
});
exports.default = {
    register,
    login
};
