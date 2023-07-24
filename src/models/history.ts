import { Event } from "@prisma/client"
import { Inventory } from "./inventory"
import { User } from "./user"

class History {
    event: Event
    user: User
    inventory?: Inventory[]
    id?: number
    createdAt?: Date
    updatedAt?: Date

    constructor(
        event: Event,
        user: User,
        inventory?: Inventory[],
        id?: number,
        createdAt?: Date,
        updatedAt?: Date) {
        this.event = event
        this.user = user
        this.inventory = inventory
        this.id = id
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}

export {
    History
}