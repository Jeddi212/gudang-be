import { Role } from '@prisma/client';

class User {
    name: string
    password: string
    level: Role
    history?: History[]

    constructor(name: string, password: string, level: Role, history?: History[]) {
        this.name = name
        this.password = password
        this.level = level
        this.history = history
    }
}

export {
    User
}