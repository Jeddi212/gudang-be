import { History } from "./history"

class Warehouse {
    location: string
    history?: History[]

    constructor(location: string, history?: History[]) {
        this.location = location
        this.history = history
    }
}

export {
    Warehouse
}