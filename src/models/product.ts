import { BOM } from "./bom"
import { Inventory } from "./inventory"

class Product {
    name: string
    stock: number
    needs?: BOM[]
    usedBy?: BOM[]
    inventory?: Inventory[]

    constructor(
        name: string,
        stock: number,
        needs?: BOM[],
        usedBy?: BOM[],
        inventory?: Inventory[]) {
        this.name = name
        this.stock = stock
        this.needs = needs
        this.usedBy = usedBy
        this.inventory = inventory
    }
}

export {
    Product
}