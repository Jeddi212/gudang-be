class Warehouse {
    id?: number
    location: string

    constructor(obj: any) {
        this.id = obj.id
        this.location = obj.location
    }
}