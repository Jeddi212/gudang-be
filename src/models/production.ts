import { Product } from "./product"

class Production {
    product: Product
    quantity: number
    id?: number
    history?: History[]
    createdAt?: Date
    updatedAt?: Date

    constructor(
        product: Product,
        quantity: number,
        history: History[],
        id?: number,
        createdAt?: Date,
        updatedAt?: Date) {
        this.product = product
        this.quantity = quantity
        this.history = history
        this.id = id
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}

export {
    Production
}