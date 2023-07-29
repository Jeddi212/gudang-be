import { Event } from "@prisma/client"
import { HistoryDTO } from "./history-dto"

class TransactionDTO {
    event: Event
    username: string
    history: HistoryDTO[]
    createdAt?: Date

    constructor(
        event: Event,
        username: string,
        history: HistoryDTO[]) {
        this.event = event
        this.username = username
        this.history = history
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