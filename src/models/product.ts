import { BOM } from "./bom"
import { History } from "./history"
import { Inventory } from "./inventory"

class Product {
    name: string
    stock: number
    inventory?: Inventory[]
    needs?: BOM[]
    usedBy?: BOM[]
    id?: number

    constructor(
        name: string,
        stock: number,
        needs?: BOM[],
        usedBy?: BOM[],
        inventory?: Inventory[],
        id?: number) {
        this.name = name
        this.stock = stock
        this.inventory = inventory
        this.needs = needs
        this.usedBy = usedBy
        this.id = id
    }
}

export {
    Product
}