import { Product } from "./product"
import { Production } from "./production"
import { Warehouse } from "./warehouse"

class History {
    quantity: number
    production: Production
    product: Product
    warehouse: Warehouse
    id?: number
    createdAt?: Date
    updatedAt?: Date

    constructor(
        quantity: number,
        production: Production,
        product: Product,
        warehouse: Warehouse,
        id?: number,
        createdAt?: Date,
        updatedAt?: Date) {
        this.quantity = quantity
        this.production = production
        this.product = product
        this.warehouse = warehouse
        this.id = id
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}

export {
    History
}