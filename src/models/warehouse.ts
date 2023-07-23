class Warehouse {
    id?: number
    location: string

    constructor(location: string, id?: number) {
        this.location = location
        this.id = id
    }
}

export {
    Warehouse
}