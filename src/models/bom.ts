import { Product } from "./product"

class BOM {
    product: Product
    material: Product
    quantity: number

    constructor(
        product: Product,
        material: Product,
        quantity: number) {
        this.product = product
        this.material = material
        this.quantity = quantity
    }
}

export {
    BOM
}