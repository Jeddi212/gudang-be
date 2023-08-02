import { History } from "./history"
import { Inventory } from "./inventory"

class Warehouse {
    location: string
    inventory?: Inventory[]
    history?: History[]

    constructor(location: string, inventory?: Inventory[], history?: History[]) {
        this.location = location
        this.inventory = inventory
        this.history = history
    }
}

export {
    Warehouse
}