import { Role } from '@prisma/client';

interface JWTPayload {
    id: number,
    name: string,
    isAdmin: Role
}

export {
    JWTPayload
}