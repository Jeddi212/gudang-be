import { Product } from "../models/product"

class CreateProductDTO {
    name: string
    stock: number = 0
    needs: Material[]

    constructor(name: string, needs: Material[]) {
        this.name = name
        this.needs = needs
    }

    mapToProduct() { return new Product(this.name, this.stock) }
}

class Material {
    name: string
    quantity: number

    constructor(name: string, quantity: number) {
        this.name = name
        this.quantity = quantity
    }

    mapToProduct() { return new Product(this.name, 0) }
}

export {
    CreateProductDTO,
    Material
}