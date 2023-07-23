import { Role } from '@prisma/client';

class Payload {
    message: string

    constructor(message: string) { this.message = message }
}

class JWTPayload extends Payload {
    id?: number
    name: string
    level?: Role

    constructor(message: string, name: string, id?: number, level?: Role) {
        super(message)
        this.name = name
        this.id = id
        this.level = level
    }
}

export {
    JWTPayload
}