import { BOM } from "./bom"
import { History } from "./history"

class Product {
    name: string
    stock: number
    description?: string
    needs?: BOM[]
    usedBy?: BOM[]
    history?: History[]

    constructor(
        name: string,
        stock: number,
        description?: string,
        needs?: BOM[],
        usedBy?: BOM[],
        history?: History[]) {
        this.name = name
        this.stock = stock
        this.description = description
        this.needs = needs
        this.usedBy = usedBy
        this.history = history
    }
}

export {
    Product
}