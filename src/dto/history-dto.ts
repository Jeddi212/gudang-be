import { Event } from "@prisma/client"
import { InventoryDTO } from "./inventory-dto"

class HistoryDTO {
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

export {
    HistoryDTO
}