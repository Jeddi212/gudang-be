import { Role } from '@prisma/client';

class User {
    name: string
    password: string
    level: Role
    id?: number
    history?: History[]

    constructor(name: string, password: string, level: Role, id?: number, history?: History[]) {
        this.name = name
        this.password = password
        this.level = level
        this.id = id
        this.history = history
    }
}

export {
    User
}