import { BOM } from "./bom"
import { Production } from "./production"

class Product {
    name: string
    stock: number
    history?: History[]
    production?: Production[]
    needs?: BOM[]
    usedBy?: BOM[]
    id?: number

    constructor(
        name: string,
        stock: number,
        history?: History[],
        production?: Production[],
        needs?: BOM[],
        usedBy?: BOM[],
        id?: number) {
        this.name = name
        this.stock = stock
        this.history = history
        this.production = production
        this.needs = needs
        this.usedBy = usedBy
        this.id = id
    }
}

export {
    Product
}