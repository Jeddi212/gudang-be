import { Role } from '@prisma/client';

class Payload {
    message: string
    data: any

    constructor(message: string, data: any) { this.message = message, this.data = data }
}

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
    Payload,
    JWTPayload
}