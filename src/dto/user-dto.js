"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDTO = exports.UserAuthDTO = void 0;
const user_1 = require("../models/user");
const client_1 = require("@prisma/client");
class UserAuthDTO {
    constructor(name, password) {
        this.level = client_1.Role.STAFF;
        this.name = name;
        this.password = password;
    }
    mapToModel() { return new user_1.User(this.name, this.password, this.level); }
}
exports.UserAuthDTO = UserAuthDTO;
class UserDTO {
    constructor(name, level) {
        this.name = name;
        this.level = level;
    }
}
exports.UserDTO = UserDTO;
