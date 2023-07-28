import { Inventory } from "../models/inventory"
import { Product } from "../models/product"
import { Warehouse } from "../models/warehouse"

class InventoryDTO {
    quantity: number
    product: string
    warehouse: string
    history?: number

    constructor(
        quantity: number,
        product: string,
        warehouse: string,
        history?: number) {
        this.quantity = quantity
        this.product = product
        this.warehouse = warehouse
        this.history = history
    }

    mapToModel() {
        return new Inventory(this.quantity, new Product(this.product, 0), new Warehouse(this.warehouse))
    }
}

export {
    InventoryDTO
}