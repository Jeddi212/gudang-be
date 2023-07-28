import { Product } from "./product"
import { Warehouse } from "./warehouse"

class Inventory {
    quantity: number
    product: Product
    warehouse: Warehouse
    id?: number
    createdAt?: Date
    updatedAt?: Date

    constructor(
        quantity: number,
        product: Product,
        warehouse: Warehouse,
        id?: number,
        createdAt?: Date,
        updatedAt?: Date) {
        this.quantity = quantity
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