class HistoryDTO {
    quantity: number
    product: string
    warehouse: string
    transaction?: number

    constructor(
        quantity: number,
        product: string,
        warehouse: string,
        transaction?: number) {
        this.quantity = quantity
        this.product = product
        this.warehouse = warehouse
        this.transaction = transaction
    }
}

export {
    HistoryDTO
}