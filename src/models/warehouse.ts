import { Inventory } from "./inventory"

class Warehouse {
    location: string
    inventory?: Inventory[]

    constructor(location: string, inventory?: Inventory[]) {
        this.location = location
        this.inventory = inventory
    }
}

export {
    Warehouse
}