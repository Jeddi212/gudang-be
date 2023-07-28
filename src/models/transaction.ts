import { Event } from "@prisma/client"
import { History } from "./history"
import { User } from "./user"

class Transaction {
    event: Event
    user: User
    history?: History[]
    id?: number
    createdAt?: Date
    updatedAt?: Date

    constructor(
        event: Event,
        user: User,
        history?: History[],
        id?: number,
        createdAt?: Date,
        updatedAt?: Date) {
        this.event = event
        this.user = user
        this.history = history
        this.id = id
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}

export {
    Transaction
}