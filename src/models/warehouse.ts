import { Inventory } from "./inventory"

class Warehouse {
    location: string
    id?: number
    inventory?: Inventory[]

    constructor(location: string, id?: number, inventory?: Inventory[]) {
        this.location = location
        this.id = id
        this.inventory = inventory
    }
}

export {
    Warehouse
}