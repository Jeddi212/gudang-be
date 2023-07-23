import { Role } from '@prisma/client';

class User {
    name: string
    password: string
    level: Role
    id?: number

    constructor(name: string, password: string, level: Role, id?: number) {
        this.name = name
        this.password = password
        this.level = level
        this.id = id
    }
}

export {
    User
}