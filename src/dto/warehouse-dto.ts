import { Warehouse } from '../models/warehouse'

class WarehouseDTO {
    location: string

    constructor(location: string) {
        this.location = location
    }

    mapToModel() { return new Warehouse(this.location) }
}

export {
    WarehouseDTO
}