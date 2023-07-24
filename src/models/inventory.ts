import { Product } from "./product"
import { History } from "./history"
import { Warehouse } from "./warehouse"

class Inventory {
    quantity: number
    history: History
    product: Product
    warehouse: Warehouse
    id?: number
    createdAt?: Date
    updatedAt?: Date

    constructor(
        quantity: number,
        history: History,
        product: Product,
        warehouse: Warehouse,
        id?: number,
        createdAt?: Date,
        updatedAt?: Date) {
        this.quantity = quantity
        this.history = history
        this.product = product
        this.warehouse = warehouse
        this.id = id
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}

export {
    Inventory
}