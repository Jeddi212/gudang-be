import { BOM } from "./bom"
import { Inventory } from "./inventory"

class Product {
    name: string
    stock: number
    needs?: BOM[]
    usedBy?: BOM[]
    inventory?: Inventory[]
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
        this.needs = needs
        this.usedBy = usedBy
        this.inventory = inventory
        this.id = id
    }
}

export {
    Product
}