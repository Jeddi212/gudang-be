import { Product } from "../models/product"

class CreateProductDTO {
    name: string
    stock: number = 0
    description: string
    needs: Material[]

    constructor(name: string, description: string, needs: Material[]) {
        this.name = name
        this.description = description
        this.needs = needs
    }

    mapToProduct() { return new Product(this.name, this.stock, this.description) }
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