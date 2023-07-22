import { Role } from '@prisma/client';

class JWTPayload {
    id?: number
    name: string
    level?: Role

    constructor(name: string, id?: number, level?: Role) {
        this.name = name
        this.id = id
        this.level = level
    }
}

export {
    JWTPayload
}