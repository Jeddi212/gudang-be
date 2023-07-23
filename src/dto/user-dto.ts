import { UserModel } from "../models/user-model"
import { Role } from '@prisma/client';

class UserAuthDTO {
    name: string
    password: string

    constructor(name: string, password: string) {
        this.name = name
        this.password = password
    }

    mapToModel(): UserModel { return new UserModel(this.name, this.password) }
}

class UserDTO {
    id: number
    name: string
    level: Role

    constructor(id: number, name: string, level: Role) {
        this.id = id
        this.name = name
        this.level = level
    }
}

export {
    UserAuthDTO,
    UserDTO
}