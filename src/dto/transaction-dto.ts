import { Event } from "@prisma/client"
import { InventoryDTO } from "./inventory-dto"

class TransactionDTO {
    event: Event
    username: string
    inventory: InventoryDTO[]
    createdAt?: Date

    constructor(
        event: Event,
        username: string,
        inventory: InventoryDTO[]) {
        this.event = event
        this.username = username
        this.inventory = inventory
    }
}

class UpdateTransactionDTO {
    event: Event
    username: string

    constructor(
        event: Event,
        username: string) {
        this.event = event
        this.username = username
    }
}

export {
    TransactionDTO,
    UpdateTransactionDTO,
}